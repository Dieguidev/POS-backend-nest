import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class ProductPaginationDto {
  @IsInt({ message: 'El límite debe ser un número entero' })
  @Min(1, { message: 'El límite debe ser al menos 1' })
  @Max(100, { message: 'El límite no puede ser mayor a 100' })
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsInt({ message: 'La página debe ser un número entero' })
  @Min(1, { message: 'La página debe ser al menos 1' })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsInt({ message: 'El ID de la categoría debe ser un número entero' })
  @IsPositive({ message: 'El ID de la categoría debe ser un número positivo' })
  @IsOptional()
  @Type(() => Number)
  @Type(() => Number)
  category_id?: number;
}
