import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { ProductsService } from '../../application/service/products.service';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductPaginationDto } from '../../application/dto/product-pagination.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() productPaginationDto: ProductPaginationDto) {
    return this.productsService.findAll(productPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
