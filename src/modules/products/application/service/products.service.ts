import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductPaginationDto } from '../dto/product-pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }

  async findAll(productPaginationDto: ProductPaginationDto) {
    const { limit = 10, page = 1, category_id } = productPaginationDto;

    const [total, products] = await Promise.all([
      this.productRepository.countAllProducts(category_id),
      this.productRepository.findAllProducts(productPaginationDto),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page,
      totalPages,
      next:
        total - page * limit > 0
          ? `/api/products?page=${page + 1}&limit=${limit}`
          : null,
      prev:
        page - 1 > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
      data: products,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
