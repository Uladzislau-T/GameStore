import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto{
  @ApiProperty({example:'string'})
  readonly author: string

  @ApiProperty({example:'string'})
  readonly title: string

  @ApiProperty({example:'string'})
  readonly description: string

  @ApiProperty({example:'decimal'})
  readonly price: number
}