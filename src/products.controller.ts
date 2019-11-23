import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    ) {
    const generatedId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
    return {generatedId};
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    ) {
      this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
      return 'Updated!';
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productService.deleteProduct(prodId);
    return 'Deleted!';
  }
}
