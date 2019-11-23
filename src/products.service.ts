import { Injectable, NotFoundException } from '@nestjs/common';
import {Product} from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const newId = Math.random().toString();
    const newProduct = new Product(newId, title, desc, price);
    this.products.push(newProduct);
    return newId;
  }

  getAllProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return {...product};
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = {...product};
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products.find((prod) => prod.id === id);
    if (!product ) {
      throw new NotFoundException('Could not find the product!');
    }
    return [product, productIndex];
  }

  deleteProduct(prodId: string) {
    const [product, index] = this.findProduct(prodId);
    this.products.splice(index, 1);
  }
}
