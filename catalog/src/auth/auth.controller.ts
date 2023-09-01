import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateIdentityDto } from 'src/identity/dto/create-identity.dto';
import { IdentityService } from 'src/identity/identity.service';
import * as bcrypt from 'bcryptjs'
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private identityService: IdentityService,
    ){}


  @Post('/login')
  async login(@Body() dto: CreateIdentityDto){
    const identity = await this.identityService.getUserByEmail(dto.email)
    if(!identity){
      throw new UnauthorizedException({message:"User with such email doesn't exist"})
    }

    if(dto.password != identity.password){
      throw new UnauthorizedException({message:"Password isn't correct"})
    }

    return this.authService.generateToken(identity)
  }

  @Post('/registration')
  async registration(@Body() dto: CreateIdentityDto){
    let identity = await this.identityService.getUserByEmail(dto.email)
    if(identity){
      throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(dto.password, 5)
    identity = await this.identityService.createIdentity({...dto, password:hashPassword})
    return this.authService.generateToken(identity)
  }
}
