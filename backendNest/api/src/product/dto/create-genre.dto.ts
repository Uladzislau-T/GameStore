import { ApiProperty } from "@nestjs/swagger"

export class CreateGenreDto{
  @ApiProperty({example:'string'})
  readonly name: string  
}