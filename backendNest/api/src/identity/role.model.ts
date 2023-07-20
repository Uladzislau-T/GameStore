import { ApiProperty } from "@nestjs/swagger"
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { Identity } from "src/identity/identity.model"
import { IdentityRoles } from "./identity-roles.model"

interface RoleCreationAttrs {
  name: string
  description: string
}


@Table({tableName: 'roles', timestamps:false})
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @ApiProperty({example:'string', description: 'desc example'})
  @Column({type: DataType.STRING, unique:true, allowNull:false})
  name:string

  @ApiProperty({example:'string'})
  @Column({type: DataType.TEXT, unique:false, allowNull:false})
  description: string

  @BelongsToMany(() => Identity, () => IdentityRoles)
  identities: Identity[]
}