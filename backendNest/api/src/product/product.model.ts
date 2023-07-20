import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ProductCreationAttrs {
  author: string,
  title: string,
  description: string,
  price: number
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

  // @Column({type: DataType.STRING, unique:true, allowNull:true})
  // previewImage: string

  // @Column({type: DataType.STRING, unique:true, allowNull:true})
  // mainImage: HTMLImageElement

  // @Column({type: DataType.DATE, unique:true, autoIncrement:true, primaryKey:true})
  // timeCreated: Date

  // @Column({type: DataType.STRING, unique:true, allowNull:false})
  // genres: string[]

  // @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  // features: string[]

  // @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  // platforms: string[]
}