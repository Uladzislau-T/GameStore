import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateIdentityDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Identity } from './identity.model';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('identity')
export class IdentityController {
  constructor(
    @InjectModel(Identity) private identityRepository: typeof Identity,
    @InjectModel(Role) private roleRepository: typeof Role){}

  @ApiResponse({ status: 200, type: [Identity]})
  @Post()
  async createIdentity(@Body() dto: CreateIdentityDto){
    const result = await this.identityRepository.create(dto)
    const role = await this.roleRepository.findOne({where:{name: "USER"}})
    await result.$set('roles', [role.id])
    return result
  }

  @ApiResponse({ status: 200, type: [Identity]})
  @Get()
  async getAllIdentities(){
    const result = await this.identityRepository.findAll({
      include: {
        model: Role, 
        attributes:["name"],
        through:{attributes:[]}
      }})
    return result
  }

  @ApiResponse({ status: 200, type: [Role]})
  @Get('/roles')
  async getAllRoles(){
    const result = await this.roleRepository.findAll()
    return result
  }

  @ApiResponse({ status: 200, type: [Role]})
  @Get('/roles')
  async getRoleByName(@Query('name') name: string){
    const result = await this.roleRepository.findOne({where: {name}})
    return result
  }

  @ApiResponse({ status: 200, type: [Role]})
  @Post('/roles')
  async createRole(@Body() dto: CreateRoleDto){
    const result = await this.roleRepository.create(dto)
    return result
  }
}
