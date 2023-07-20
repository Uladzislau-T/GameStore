import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { Product } from './product/product.model';
import { IdentityModule } from './identity/identity.module';
import { Role } from './identity/role.model';
import { IdentityRoles } from './identity/identity-roles.model';
import { Identity } from './identity/identity.model';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Product, Identity, Role, IdentityRoles],
      autoLoadModels: true //автоматическое создание моделей в бд, на основе тех, что тут
  }),
    ProductModule,
    IdentityModule,
    CartModule,]  
})
export class AppModule {}
