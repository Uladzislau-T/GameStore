import { ApiProperty } from "@nestjs/swagger"
import { Genre } from "../genre.model"
import { Feature } from "../feature.model"
import { Platform } from "../platform.model"

export class CreateProductDto{
  @ApiProperty({example:'string'})
  readonly author: string

  @ApiProperty({example:'string'})
  readonly title: string

  @ApiProperty({example:'string'})
  readonly description: string

  @ApiProperty({example:'decimal'})
  readonly price: number

  @ApiProperty({example:'string'})
  readonly previewImage: string

  @ApiProperty({example:'string'})
  readonly mainImage: string

  @ApiProperty({example:'date'})
  readonly timeCreated: Date

  @ApiProperty({example:'string[]'})
  readonly genres: string[]

  @ApiProperty({example:'string[]'})
  readonly features: string[]

  @ApiProperty({example:'string[]'})
  readonly platforms: string[]
}