import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Genre } from "./genre.model";
import { Feature } from "./feature.model";
import { Platform } from "./platform.model";
import { ProductGenres } from "./product-genres.model";
import { ProductFeatures } from "./product-features.model";
import { ProductPlatforms } from "./product-platforms.model";

interface ProductCreationAttrs {
  author: string,
  title: string,
  description: string,
  price: number
  previewImage: string
  mainImage:string
  timeCreated: Date
}


@Table({tableName: 'products', timestamps:false})
export class Product extends Model<Product, ProductCreationAttrs> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @ApiProperty({example:'string', description: 'desc example'})
  @Column({type: DataType.STRING, unique:false, allowNull:false})
  title:string

  @ApiProperty({example:'string'})
  @Column({type: DataType.STRING, unique:false, allowNull:false})
  author:string

  @ApiProperty({example:'string'})
  @Column({type: DataType.TEXT, unique:false, allowNull:false})
  description: string

  @ApiProperty({example:'decimal'})
  @Column({type: DataType.DECIMAL})
  price: number

  @Column({field: 'preview_image', type: DataType.STRING, allowNull:false})
  previewImage: string

  @Column({field: 'main_image', type: DataType.STRING, allowNull:true})
  mainImage: string

  @Column({field: 'time_created', type: DataType.DATE})
  timeCreated: Date

  @BelongsToMany(() => Genre, () => ProductGenres)
  genres: Genre[]

  @BelongsToMany(() => Feature, () => ProductFeatures)
  features: Feature[]

  @BelongsToMany(() => Platform, () => ProductPlatforms)
  platforms: Platform[]
}