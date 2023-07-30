import { Module, forwardRef } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IdentityController } from './identity.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {  Role } from './role.model';
import { Identity } from './identity.model';
import { IdentityRoles } from './identity-roles.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [IdentityService],
  controllers: [IdentityController],
  imports: [
    SequelizeModule.forFeature([Identity, Role, IdentityRoles]),
    forwardRef(() => AuthModule)
  ],
  exports:[
    IdentityService
  ]
})
export class IdentityModule {}
