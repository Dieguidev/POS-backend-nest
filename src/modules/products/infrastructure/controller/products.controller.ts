import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { ProductsService } from '../../application/service/products.service';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductPaginationDto } from '../../application/dto/product-pagination.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from 'src/modules/upload-image/upload-image.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly uploadImageService: UploadImageService,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() productPaginationDto: ProductPaginationDto) {
    return this.productsService.findAll(productPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    console.log('updateProductDto', updateProductDto);
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.remove(+id);
  }

  @Post('upload-image/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', IdValidationPipe) id: string,
  ) {
    if (!file) {
      throw new BadRequestException('La imagen es obligatoria');
    }

    return this.uploadImageService.uploadFile(file);
  }
}
