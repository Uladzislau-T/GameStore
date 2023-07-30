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
import { Genre } from './product/genre.model';
import { Feature } from './product/feature.model';
import { Platform } from './product/platform.model';
import { ProductGenres } from './product/product-genres.model';
import { ProductFeatures } from './product/product-features.model';
import { ProductPlatforms } from './product/product-platforms.model';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "..", 'static'),
    }),
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

      models: [Product, Identity, Role, IdentityRoles, Genre, Feature, Platform,
         ProductGenres, ProductFeatures,ProductPlatforms],
         
      autoLoadModels: true //автоматическое создание моделей в бд, на основе тех, что тут
  }),
    ProductModule,
    IdentityModule,
    CartModule,
    FileModule,
    AuthModule,]  
})
export class AppModule {}
