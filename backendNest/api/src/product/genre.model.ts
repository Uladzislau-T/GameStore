import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CreateGenreAttrs{
  
}

@Table({tableName: 'genres'})
export class Product extends Model<Product> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number
  @Column({type: DataType.INTEGER, unique:true, allowNull:false})
  name:string
}