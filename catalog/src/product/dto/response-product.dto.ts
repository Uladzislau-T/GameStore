import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../product.model";


export class ResponseProductDto{
  @ApiProperty({example:'Product[]'})
  readonly products: Product[]

  @ApiProperty({example:'number'})
  readonly productCount: number

  constructor(products: Product[], productCount: number){
    this.products = products,
    this.productCount = productCount
  }
}