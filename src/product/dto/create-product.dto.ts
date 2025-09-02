import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Laptop' })
  @IsString() @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product price', example: 5000 })
  @Type(() => Number) @IsNumber() @Min(0)
  price: number;

  @ApiPropertyOptional({ description: 'Stock quantity', example: 10 })
  @Type(() => Number) @IsNumber() @Min(0) @IsOptional()
  stock?: number;

  @ApiProperty({ description: 'Category ID', example: '64f123abc456def789012345' })
  @IsMongoId()
  categoryId: string;

  @ApiPropertyOptional({ description: 'Product description', example: 'High-end gaming laptop' })
  @IsString() @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Is product active?', example: true })
  @IsBoolean() @IsOptional()
  isActive?: boolean;
}

