import { ApiProperty } from "@nestjs/swagger"

export class CreateFeatureDto{
  @ApiProperty({example:'string'})
  readonly name: string  
}