import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFilterItemsDTO } from './dto/create-filter.dto';
import { Genre } from './genre.model';
import { Feature } from './feature.model';
import { Platform } from './platform.model';
import {promises as fs} from 'fs';
import { join } from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileService, FileType } from 'src/file/file.service';
import { Request } from "express";
import { Op } from 'sequelize';


@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(Genre) private genreRepository: typeof Genre,
    @InjectModel(Feature) private featuretRepository: typeof Feature,
    @InjectModel(Platform) private platformRepository: typeof Platform,
    private fileService: FileService
    ) {}

  // @ApiOperation({summary:'Product Creation'})
  @ApiResponse({ status: 200})
  @Get()
  async getAll(@Req() req: Request, @Query('_sort') sort: string = 'ALL', @Query('_page') page: number = 1,
  @Query('_limit') limit: number = 12, @Query('genres') genres?: string, @Query('features') features?: string,
  @Query('platforms') platforms?: string, @Query('startpage') startpage: boolean = false) {

    const protocol = req?.protocol
    const host = req?.get("Host");
    const fullUrl = `${protocol}://${host}/`;

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
        },
        {
          model:Feature,
          attributes:['name'],
        },
        {
          model:Platform,
          attributes:['name'],
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

    const preResult = filteredProducts.map((p) => {
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

    let games= []
    let lastId = preResult.length + 1
    for (let i = 0; i < 8; i++) {
      for (let i2 = 0; i2 < preResult.length; i2++) {
        let tempObj = Object.assign({}, preResult[i2])
        tempObj.id = lastId
        games.push(tempObj)   
        lastId = lastId + 1     
      }      
    }

    const gamesLength = games.length

    let startIndex = (page - 1) * limit

    if(games.length - startIndex < 1)
    {
      let endIndex = 0 + Number(limit)
      games = games.slice(0, endIndex)
    }
    else{
      let endIndex = startIndex + Number(limit)
      games = games.slice(startIndex, endIndex)
    }

    const result = {games, gamesLength}

    return result
  }  

  @ApiResponse({ status: 200, type: [Product]})
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'previewImage', maxCount: 1 },
    // { name: 'background', maxCount: 1 },
  ]))
  @Post()
  async createProduct(@UploadedFiles() files, @Body() productDto: CreateProductDto) {
    const count = await this.productRepository.count({where:{title: productDto.title}})
    
    if(count > 0)
      throw new HttpException("Item already exists",HttpStatus.BAD_REQUEST)
    
    const {previewImage} = files

    const previewImagePath = this.fileService.createFile(FileType.PREVIEWIMAGE, previewImage[0])    

    // const product = await this. productRepository.create({...CreateProductDto, previewImage: previewImagePath})
     
    const product = await this. productRepository.create(CreateProductDto)
    return product
  }  

  @ApiResponse({ status: 200, type: CreateFilterItemsDTO})
  @Get('/categories')
  async getAllCategories() { 
    const dbGenres = (await this.genreRepository.findAll({attributes:['name']})).map(g => g.name)
    const dbFeatures = (await this.featuretRepository.findAll({attributes:['name']})).map(f => f.name)
    const dbPlatforms = (await this.platformRepository.findAll({attributes:['name']})).map(p => p.name)

    return new CreateFilterItemsDTO(dbGenres, dbFeatures, dbPlatforms)
  }

  @ApiResponse({ status: 200})
  @Post('/categories')
  async createProductFilterItems(@Body() filterDto: CreateFilterItemsDTO) {   

    const genres: Genre[] = []
    const features: Feature[] = []
    const platforms: Platform[] = []

    if(filterDto.genres){
      for await (const name of filterDto.genres){        
        const genre = await this.genreRepository.findOrCreate({where: {name: name}})
        genres.push(genre[0])
      }
    }
    if(filterDto.features){
      for await (const name of filterDto.features){        
        const feature = await this.featuretRepository.findOrCreate({where: {name: name}})
        features.push(feature[0])
      }
    }
    if(filterDto.platforms){
      for await (const name of filterDto.platforms){        
        const platform = await this.platformRepository.findOrCreate({where: {name: name}})
        platforms.push(platform[0])
      }
    }

    return {genres: genres, features: features, platforms: platforms}  
  }  


  @Get('/dbseed')
  async createProductsFromJson() {   

    let jsonString
    try {      
      jsonString = await fs.readFile(join(process.cwd(), 'db.json'))
      jsonString = JSON.parse(jsonString) 
    } catch (e) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }    

    let genresCount = await this.genreRepository.count()
    let genres: string[]
    let dbGenres: Genre[]
    if(genresCount <= 0)
    {
      genres = jsonString.categories.genres
      let tempGenres = genres.map((g) => { return {name: g}})
      dbGenres = await this.genreRepository.bulkCreate(tempGenres)
    }

    let featuresCount = await this.featuretRepository.count()
    let features: string[]
    let dbFeatures: Feature[]
    if(featuresCount <= 0)
    {
      features = jsonString.categories.features
      let tempFeatures = features.map((f) => {return {name: f}})
      dbFeatures = await this.featuretRepository.bulkCreate(tempFeatures)
    }   
    
    let platformsCount = await this.platformRepository.count()
    let platforms: string[]
    let dbPlatforms: Platform[]
    if(platformsCount <= 0){
      platforms = jsonString.categories.platforms
      let tempPlatforms = platforms.map((p) => {return {name: p}})
      dbPlatforms = await this.platformRepository.bulkCreate(tempPlatforms)
    }    

    let productCount = await this.productRepository.count()

    if(productCount <= 0){

      if(dbGenres === undefined || dbGenres.length <= 0)
        dbGenres = await this.genreRepository.findAll()
      if(dbFeatures === undefined || dbFeatures.length <= 0)
        dbFeatures = await this.featuretRepository.findAll()
      if(dbPlatforms === undefined || dbPlatforms.length <= 0)
        dbPlatforms = await this.platformRepository.findAll()      

      let products = jsonString.games
      let dbProducts = await this.productRepository.bulkCreate(products)

      for (let i = 0; i < dbProducts.length; i++) {
        
        for (let i2 = 0; i2 < products[i].genres.length; i2++) {
          let genre = dbGenres.find(g => g.name === products[i].genres[i2])
          dbProducts[i].$set('genres', [genre.id])
        }
        for (let i2 = 0; i2 < products[i].features.length; i2++) {
          let feature = dbFeatures.find(f => f.name === products[i].features[i2])
          dbProducts[i].$set('features', [feature.id])
        }
        for (let i2 = 0; i2 < products[i].platforms.length; i2++) {
          // let temp: string = products[i].platforms[i2]
          let platform = dbPlatforms.find(p => p.name === products[i].platforms[i2])
          dbProducts[i].$set('platforms', [platform.id])
        }        
      }
    }
    
    console.log("Seeding has been completed successfully")
  }  
}
