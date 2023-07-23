import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Product } from "./product.model"
import { Genre } from "./genre.model"

@Table({tableName: 'product_genres', timestamps:false})
export class ProductGenres extends Model<ProductGenres> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @ForeignKey(() => Product)
  @Column({type: DataType.INTEGER})
  productId:number

  @ForeignKey(() => Genre)
  @Column({type: DataType.INTEGER})
  genreId: number
}