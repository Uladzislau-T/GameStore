import { ApiProperty } from "@nestjs/swagger"
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Role } from "./role.model"
import { Identity } from "./identity.model"


@Table({tableName: 'identity_roles', timestamps:false})
export class IdentityRoles extends Model<IdentityRoles> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @ForeignKey(() => Identity)
  @Column({type: DataType.INTEGER})
  identityId:number

  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER})
  rolesId: number
}