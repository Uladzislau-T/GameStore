import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Identity } from './identity.model';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { Role } from './role.model';

@Injectable()
export class IdentityService {  
  constructor(
    @InjectModel(Identity) private identityRepository: typeof Identity,
    @InjectModel(Role) private roleRepository: typeof Role){}

  async createIdentity(dto: CreateIdentityDto){
    const result = await this.identityRepository.create(dto)
    const role = await this.roleRepository.findOne({where:{name: "USER"}})
    await result.$set('roles', [role.id])
    result.roles = [role]
    return result
  }

  async getUserByEmail(email: string) {
    const identity = await this.identityRepository.findOne({where:{email},include:{all:true}})
    return identity
  }
}
