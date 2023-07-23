import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { Product } from "./product.model"
import { ProductPlatforms } from "./product-platforms.model"

interface CreatePlatformAttrs{
  name: string
}

@Table({tableName: 'platforms', timestamps:false})
export class Platform extends Model<Platform, CreatePlatformAttrs> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @Column({type: DataType.STRING, unique:true, allowNull:false})
  name:string

  @BelongsToMany(() => Product, () => ProductPlatforms)
  products: Product[]
}