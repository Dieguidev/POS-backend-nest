import { IsNotEmpty, MinLength } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoria no puede ir vacio' })
  @MinLength(1, { message: 'el nombre debe tener al menos 1 caracter' })
  name: string;
}
