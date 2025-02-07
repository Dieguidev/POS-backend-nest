import { ArgumentMetadata, BadRequestException, Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';

@Injectable()
export class IdValidationPipe extends ParseIntPipe {
  constructor(){
    super({
      exceptionFactory: (param: string) => {
        return new BadRequestException(`ID no válido debe ser un número entero`);
      }
    })
  }
}
