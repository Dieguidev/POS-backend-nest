import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
  @MaxLength(100, {
    message: 'El nombre del producto no puede tener más de 100 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'La imagen del producto no puede estar vacia' })
  image: string;

  @IsNotEmpty({ message: 'El precio del producto no puede estar vacío' })
  @IsNumber({}, { message: 'El precio del producto debe ser un número' })
  @Min(0, { message: 'El precio del producto debe ser un número positivo' })
  price: number;

  @IsNotEmpty({ message: 'El inventario del producto no puede estar vacío' })
  @IsInt({ message: 'El inventario del producto debe ser un número entero' })
  @Min(0, { message: 'El inventario del producto no puede ser negativo' })
  inventory: number;

  @IsNotEmpty({ message: 'El ID de la categoría no puede estar vacío' })
  @IsInt({ message: 'El ID de la categoría debe ser un número entero' })
  @Min(1, { message: 'El ID de la categoría debe ser un número positivo' })
  categoryId: number;
}
