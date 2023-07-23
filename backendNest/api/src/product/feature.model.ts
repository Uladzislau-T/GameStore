import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { Product } from "./product.model"
import { ProductFeatures } from "./product-features.model"

interface CreateFeatureAttrs{
  name: string
}

@Table({tableName: 'features', timestamps:false})
export class Feature extends Model<Feature, CreateFeatureAttrs> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @Column({type: DataType.STRING, unique:true, allowNull:false})
  name:string

  @BelongsToMany(() => Product, () => ProductFeatures)
  products: Product[]
}