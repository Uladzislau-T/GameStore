import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productRepository: typeof Product) {}

  async createProduct(dto: CreateProductDto) {
    const product = await this.productRepository.create(dto)
    return dto
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll()
    return products
  }
}
