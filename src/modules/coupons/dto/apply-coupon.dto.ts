import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ApplyCouponDto {
  @IsNotEmpty({ message: 'El nombre del cupón no puede estar vacío' })
    @IsString({ message: 'El nombre del cupón debe ser una cadena de texto' })
    @MaxLength(100, {
      message: 'El nombre del cupón no puede tener más de 100 caracteres',
    })
    name: string;
}
