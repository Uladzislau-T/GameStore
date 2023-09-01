import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Genre } from './genre.model';
import { Feature } from './feature.model';
import { Platform } from './platform.model';
import { ResponseProductDto } from './dto/response-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(Genre) private genreRepository: typeof Genre,
    @InjectModel(Feature) private featuretRepository: typeof Feature,
    @InjectModel(Platform) private platformRepository: typeof Platform,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const product = await this.productRepository.create(dto)
    return dto
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll()
    return products
  }

  
  async getProducts(
    sort: string, 
    page:number = 1,
    limit:number = 12,
    fullUrl:string, 
    startpage:boolean,
    genres?:string, 
    features?:string, 
    platforms?:string, 
    ): Promise<ResponseProductDto | Product[]> {

    if(startpage)
    {
      let result = await this.productRepository.findAll({offset:3, limit:5})
      result.forEach((p) => {p.previewImage = fullUrl + p.previewImage})
      return result
    }

    const genresArr = genres != null ? genres.split(',') : []
    const featuresArr = features != null ? features.split(',') : []
    const platformsArr = platforms != null ? platforms.split(',') : []

    // const dbGenres: {id:number}[] = await this.genreRepository.findAll({attributes:['id'], where:{name:{[Op.in]:genresArr}},raw:true})
    // const dbFeatures = await this.genreRepository.findAll({where:{name:{[Op.in]:featuresArr}}})
    // const dbPlatforms = await this.genreRepository.findAll({where:{name:{[Op.in]:platformsArr}}})


    const products = await this.productRepository.findAll({
      include:[
        {
          model:Genre,  
          attributes:['name'],
          through: {attributes: []}
        },
        {
          model:Feature,
          attributes:['name'],
          through: {attributes: []}
        },
        {
          model:Platform,
          attributes:['name'],
          through: {attributes: []}
        }
      ]
    })

    let filteredProducts = products.filter((product) => {   
      return (
        genresArr.every(genre => product['genres'].some(g => g.name === genre)) &&
        featuresArr.every(feature => product['features'].some(f => f.name === feature)) &&
        platformsArr.every(platform => product['platforms'].some(p => p.name === platform))
      )
    })

    switch (sort) {
      case "New Releases":
        filteredProducts.sort((a,b) => {return b.timeCreated.getTime() - a.timeCreated.getTime()})
        break;
      case "Alphabetical":
        filteredProducts.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        break;
      case "Price: High to Low":
        filteredProducts.sort((a,b) => b.price - a.price)
        break;
      case "Price: Low to High":
        filteredProducts.sort((a,b) => a.price - b.price)
        break;
      default:
        break;
    }    

    let preResult = filteredProducts.map((p) => {
      return {
        id: p.id,
        author: p.author,
        title: p.title,
        description: p.description,
        price: p.price,
        previewImage: fullUrl + p.previewImage,
        mainImage:p.mainImage,
        timeCreated: p.timeCreated,
        genres: p.genres?.map((g) => {return g.name}),
        features: p.features?.map((f) => {return f.name}),
        platforms: p.platforms?.map((p) => {return p.name})
      }

    })

    // let games= []
    // let lastId = preResult.length + 1
    // for (let i = 0; i < 8; i++) {
    //   for (let i2 = 0; i2 < preResult.length; i2++) {
    //     let tempObj = Object.assign({}, preResult[i2])
    //     tempObj.id = lastId
    //     games.push(tempObj)   
    //     lastId = lastId + 1     
    //   }      
    // }

    const gamesLength = filteredProducts.length

    let startIndex = (page - 1) * limit

    if(filteredProducts.length - startIndex < 1)
    {
      let endIndex = 0 + Number(limit)
      filteredProducts = filteredProducts.slice(0, endIndex)
    }
    else{
      let endIndex = startIndex + Number(limit)
      filteredProducts = filteredProducts.slice(startIndex, endIndex)
    }

    const result = new ResponseProductDto(filteredProducts, gamesLength)

    return result
  }  
}
