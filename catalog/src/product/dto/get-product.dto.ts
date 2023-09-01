import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsOptional, IsString } from "class-validator"


export class GetProductDto{
  @ApiProperty({example:'string'})
  // @IsString({message:})
  @IsOptional()
  readonly sort: string = "ALL"

  @IsOptional()
  @ApiProperty({example:'number'})
  readonly page: number = 1

  @IsOptional()
  @ApiProperty({example:'number'})
  readonly limit: number = 12

  @IsOptional()
  @ApiProperty({example:'string'})
  readonly genres?: string 

  @IsOptional()
  @ApiProperty({example:'string'})
  readonly features?: string

  @IsOptional()
  @ApiProperty({example:'string'})
  readonly platforms?: string

  @IsOptional()
  @ApiProperty({example:'boolean'})
  readonly startpage: boolean = false
}