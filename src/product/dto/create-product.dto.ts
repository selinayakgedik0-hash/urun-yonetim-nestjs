export class CreateProductDto {
  readonly name: string;
  readonly price: number;
  readonly stock: number;
  readonly categoryId: string;
  readonly description: string;
  readonly isActive: boolean;
}

