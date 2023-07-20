import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './product.model';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService){}

  // @ApiOperation({summary:'Product Creation'})
  @ApiResponse({ status: 200, type: Product})
  @Get()
  getAll() {
    return this.productService.getAllProducts()
  }

  @ApiResponse({ status: 200, type: [Product]})
  @Post()
  create(@Body() productDto: CreateProductDto) {
    return this.productService.createProduct(productDto)
  }  
}
