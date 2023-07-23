import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { ProductGenres } from "./product-genres.model";

interface CreateGenreAttrs{
  name: string
}

@Table({tableName: 'genres', timestamps:false})
export class Genre extends Model<Genre, CreateGenreAttrs> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @Column({type: DataType.STRING, unique:true, allowNull:false})
  name:string

  @BelongsToMany(() => Product, () => ProductGenres)
  products: Product[]
}