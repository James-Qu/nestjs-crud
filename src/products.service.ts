import { Injectable, NotFoundException } from '@nestjs/common';
import {Product} from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {

  }

  async insertProduct(title: string, description: string, price: number): Promise<string> {
    const newProduct = new this.productModel({
      title, description, price,
    });
    const prod = await newProduct.save();
    return prod.id;
  }

  async getAllProducts() {
    // Model.find() returns a Query.
    const products = await this.productModel.find().exec();
    return products as Product[];
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    const product = await this.findProduct(productId);
    if (title) {
      product.title = title;
    }
    if (desc) {
      product.description = desc;
    }
    if (price) {
      product.price = price;
    }
    product.save();
  }

  private async findProduct(id: string) {
    let product: Product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find the product!');
    }
    if (!product ) {
      throw new NotFoundException('Could not find the product!');
    }
    return product as Product;
  }

  async deleteProduct(prodId: string) {
    this.productModel.deleteOne({_id: prodId}).exec();
    return 'deleted!';
  }
}
