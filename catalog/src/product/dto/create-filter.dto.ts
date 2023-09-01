import { ApiProperty } from "@nestjs/swagger"

export class CreateFilterItemsDTO{
  constructor(genres:string[],features:string[],platforms:string[]){
    this.genres = genres
    this.features = features
    this.platforms = platforms
  }

  @ApiProperty({example:'string'})
  readonly genres: string[] 

  @ApiProperty({example:'string'})
  readonly features: string[]

  @ApiProperty({example:'string'})
  readonly platforms: string[]  
}