import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { Genre } from './genre.model';
import { Feature } from './feature.model';
import { Platform } from './platform.model';
import { ProductGenres } from './product-genres.model';
import { ProductFeatures } from './product-features.model';
import { ProductPlatforms } from './product-platforms.model';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, FileService],
  imports: [
    SequelizeModule.forFeature([Product, Genre, Feature, Platform, ProductGenres, ProductFeatures,
      ProductPlatforms])
  ]
})

export class ProductModule {}
