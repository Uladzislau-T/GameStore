import { ApiProperty } from "@nestjs/swagger"

export class CreatePlatformDto{
  @ApiProperty({example:'string'})
  readonly name: string  
}