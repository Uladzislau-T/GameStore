import { ApiProperty } from "@nestjs/swagger"

export class CreateIdentityDto{
  @ApiProperty({example:'string'})
  readonly userName: string

  @ApiProperty({example:'string'})
  readonly email: string
  
  @ApiProperty({example:'string'})
  readonly password: string

  @ApiProperty({example:'string'})
  readonly image: string

  @ApiProperty({example:'boolean'})
  readonly banned: boolean

  @ApiProperty({example:'string'})
  readonly banReason: string
}