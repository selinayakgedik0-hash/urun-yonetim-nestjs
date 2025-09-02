import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Category, CategoryDocument } from '../category/schemas/category.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(dto: CreateProductDto) {
    
    const cat = await this.categoryModel.findById(dto.categoryId).exec();
    if (!cat) throw new NotFoundException('Category not found');
    const created = new this.productModel(dto);
    return created.save();
  }

  async findAll(categoryQuery?: string) {
    const filter: any = {};
    if (categoryQuery) {
      
      if (mongoose.Types.ObjectId.isValid(categoryQuery)) {
        filter.categoryId = categoryQuery;
      } else {
        const cat = await this.categoryModel.findOne({ name: categoryQuery }).exec();
        if (!cat) return []; 
        filter.categoryId = cat._id;
      }
    }
    return this.productModel.find(filter).populate('categoryId').exec();
  }

  async findOne(id: string) {
    const p = await this.productModel.findById(id).populate('categoryId').exec();
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async update(id: string, dto: UpdateProductDto) {
    if (dto.categoryId && !mongoose.Types.ObjectId.isValid(dto.categoryId)) {
      throw new NotFoundException('categoryId is invalid');
    }
    const updated = await this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.productModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Product not found');
    return { deleted: true };
  }
}
