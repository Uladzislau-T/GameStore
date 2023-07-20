import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IdentityController } from './identity.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {  Role } from './role.model';
import { Identity } from './identity.model';
import { IdentityRoles } from './identity-roles.model';

@Module({
  providers: [IdentityService],
  controllers: [IdentityController],
  imports: [
    SequelizeModule.forFeature([Identity, Role, IdentityRoles])
  ]
})
export class IdentityModule {}
