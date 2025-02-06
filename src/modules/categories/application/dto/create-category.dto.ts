import { IsNotEmpty, MinLength } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoria no puede ir vacio' })
  @MinLength(1, { message: 'La contraseña debe tener al menos 1 caracteres' })
  name: string;
}
