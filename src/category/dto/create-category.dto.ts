import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'Electronics' })
  @IsString() @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Category description', example: 'Electronic devices' })
  @IsString() @IsOptional()
  description?: string;
}
