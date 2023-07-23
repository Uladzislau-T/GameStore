import { ApiProperty } from "@nestjs/swagger"

export class CreateFilterItemsDTO{
  @ApiProperty({example:'string'})
  readonly genreNames: string[] 

  @ApiProperty({example:'string'})
  readonly featureNames: string[]

  @ApiProperty({example:'string'})
  readonly platformNames: string[]  
}