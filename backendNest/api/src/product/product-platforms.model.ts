import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Platform } from "./platform.model"
import { Product } from "./product.model"

@Table({tableName: 'product_platforms', timestamps:false})
export class ProductPlatforms extends Model<ProductPlatforms> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @ForeignKey(() => Product)
  @Column({type: DataType.INTEGER})
  productId:number

  @ForeignKey(() => Platform)
  @Column({type: DataType.INTEGER})
  platformId: number
}