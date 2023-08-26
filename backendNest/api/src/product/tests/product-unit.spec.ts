import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { Request } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '../product.model';
import { getModelToken } from '@nestjs/sequelize';
import { ProductGenres } from '../product-genres.model';
import { ProductFeatures } from '../product-features.model';
import { ProductPlatforms } from '../product-platforms.model';
import { Genre } from '../genre.model';
import { Platform } from '../platform.model';
import { Feature } from '../feature.model';
import { isArray } from 'class-validator';
// import { FileService } from 'src/file/file.service';

describe('ProductController', () => {
  let productController: ProductController
  let mockedSequelize: Sequelize
  let productModel: Product
  let genreModel: Genre
  let featureModel: Feature
  

  beforeEach(async () => {
    mockedSequelize = new Sequelize({
      database: 'testDb',
      dialect: 'sqlite',
      storage:':memory:',
      username: 'root',
      password: '',
    });

    try {
      await mockedSequelize.authenticate();
    } catch (err) {
      throw err;
    }

    mockedSequelize.addModels([Product, ProductGenres, ProductFeatures, ProductPlatforms,
    Genre, Platform, Feature])

    await mockedSequelize.sync({ force: true })

    const product = await Product.create({
      author:'name',
      title:'Gothic',
      description:'Cool game',
      price:10,
      previewImage: 'adadsfs',
      mainImage:'sfsfsfsfs',
      timeCreated: new Date()
    })

    // const mockProductModel = () => ({
    //   findAll: jest.fn().mockResolvedValue(product),
    // });

    const moduleRef: TestingModule = await Test.createTestingModule({
      //imports: [ProductService],
      controllers:[ProductController],
      providers: [
        {provide: getModelToken(Product), useValue: {findAll: jest.fn(() => [product]),}},
        // {provide: FileService, useValue: {createFile: jest.fn()}}
        {provide: getModelToken(Genre), useValue: Genre},
        {provide: getModelToken(Feature), useValue: Feature},
        {provide: getModelToken(Platform), useValue: Platform}
      ]
    })
    .compile()
    
    productController = moduleRef.get<ProductController>(ProductController) 
    // productModel = moduleRef.get<Product>(Product)    
    // genreModel = moduleRef.get<Genre>(Genre)
    
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await mockedSequelize.close();
  })
  
  it('must be defined', async () => {    
    expect(productController).toBeDefined()
  })

  it('Products count must be 1', async () => {
    const productCount = await Product.count()
    expect(productCount).toEqual(1)
  })

  it('/GET GetAll', async () => {
    jest.spyOn(Product, 'create')

    const result = await productController.getAll({
        protocol:'http',
        host:'localhost:5009',
        get: function(name: string): string{
          return this.host
        }
      } as Request,
      'ALL',
      12
    )
    


    expect(result).not.toBeNull()
    expect(result).not.toBeUndefined()
    //expect(result).toMatchObject(resultObj)



    expect(isArray(result)).toEqual(false)

    if(!isArray(result))
        expect(result.games[0].title).toEqual('Gothic')
    

    // return request(app.getHttpServer())
    //   .get('/')
    //   .expect(200)
    //   .expect('Hello World!');
  });

  
});