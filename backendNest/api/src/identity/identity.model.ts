import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { Role } from "./role.model";
import { IdentityRoles } from "./identity-roles.model";

interface IdentityCreationAttrs {
    userName: string
    email: string
    password: string
    image: string
    banned: boolean
    banReason: string
}

@Table({tableName: 'identities', timestamps:false})
export class Identity extends Model<Identity, IdentityCreationAttrs> {
    @ApiProperty({example: 'string'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'string'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    userName: string;

    @ApiProperty({example: 'string'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'string'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({ type: 'string' })
    @Column({type: DataType.STRING, allowNull: true})
    image: string;

    @ApiProperty({example: 'boolean'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'string'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => IdentityRoles)
    roles: Role[]
}

