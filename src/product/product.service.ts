import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('categoryId').exec();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).populate('categoryId').exec();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async update(id: string, updateData: Partial<CreateProductDto>): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, updateData, { new: true }).populate('categoryId');
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id);
  }
}
