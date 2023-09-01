import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Identity } from './identity.model';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { IdentityService } from './identity.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanIdentityDto } from './dto/ban-identity.sto';

@Controller('identity')
export class IdentityController {
  constructor(
    @InjectModel(Identity) private identityRepository: typeof Identity,
    @InjectModel(Role) private roleRepository: typeof Role,
    private identityService: IdentityService){}

  @ApiResponse({ status: 200, type: [Identity]})
  @Post()
  async createIdentity(@Body() dto: CreateIdentityDto){
    return await this.identityService.createIdentity(dto)
  }

  @ApiResponse({ status: 200, type: [Identity]})
  @UseGuards(JwtAuthGuard)
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
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
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
  @Post('/role')
  async createRole(@Body() dto: CreateRoleDto){
    const result = await this.roleRepository.create(dto)
    return result
  }

  @ApiResponse({ status: 200, type: [Role]})
  @Delete('/role')
  async removeRole(@Query('name') name: string){
    const role = await this.roleRepository.findOne({where:{name:name}})
    if(!role){
      throw new HttpException("Such role doesn't exist", HttpStatus.BAD_REQUEST)
    }    
    await this.roleRepository.destroy({where:{name:name}})
    return "Role is deleted"
  }

  // @ApiOperation({summary: 'Give a role'})
  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/roles')
  async addRole(@Body() dto: AddRoleDto) {
    const user = await this.identityRepository.findByPk(dto.identityId);
    const role = await this.roleRepository.findOne({where:{name:dto.name}});
    if (role && user) {
        await user.$add('role', role.id);
        return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

    // @ApiOperation({summary: 'Ban User'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    async ban(@Body() dto: BanIdentityDto) {
      const identity = await this.identityRepository.findByPk(dto.identityId);
      if (!identity) {
          throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
      }
      identity.banned = true;
      identity.banReason = dto.banReason;
      await identity.save();
      return identity;
    }
}
