import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Feature } from "./feature.model"
import { Product } from "./product.model"

@Table({tableName: 'product_feature', timestamps:false})
export class ProductFeatures extends Model<ProductFeatures> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @ForeignKey(() => Product)
  @Column({type: DataType.INTEGER})
  productId:number

  @ForeignKey(() => Feature)
  @Column({type: DataType.INTEGER})
  featureId: number
}