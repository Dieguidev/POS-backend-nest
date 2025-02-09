import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { parseISO } from 'date-fns';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'El nombre del cupón no puede estar vacío' })
  @IsString({ message: 'El nombre del cupón debe ser una cadena de texto' })
  @MaxLength(100, {
    message: 'El nombre del cupón no puede tener más de 100 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'El porcentaje no puede estar vacío' })
  @IsNumber({}, { message: 'El porcentaje debe ser un número' })
  @Min(1, { message: 'El porcentaje debe ser al menos 1' })
  @Max(100, { message: 'El porcentaje no puede ser mayor a 100' })
  percentage: number;

  @IsNotEmpty({ message: 'La fecha de expiración no puede estar vacía' })
  @IsDateString({}, { message: 'Fecha no válida' })
  expirationDate: Date;
}
