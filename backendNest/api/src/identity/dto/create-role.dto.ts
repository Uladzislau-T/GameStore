import { ApiProperty } from "@nestjs/swagger"

export class CreateRoleDto{
  @ApiProperty({example:'string'})
  readonly name: string

  @ApiProperty({example:'string'})
  readonly description: string 
}