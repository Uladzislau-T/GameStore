import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class CreateIdentityDto{
  @ApiProperty({example:'string'})
  readonly userName: string

  @ApiProperty({example:'string'})
  @IsString({message: 'Must be a string'})
  @IsEmail({}, {message: "Incorrect email"})
  readonly email: string
  
  @ApiProperty({example:'string'})
  @IsString({message: 'Must be a string'})
  @Length(4, 16, {message: 'not less then 4 and not bigger then 16'})
  readonly password: string

  @ApiProperty({example:'string'})
  readonly image: string

  @ApiProperty({example:'boolean'})
  readonly banned: boolean

  @ApiProperty({example:'string'})
  readonly banReason: string
}