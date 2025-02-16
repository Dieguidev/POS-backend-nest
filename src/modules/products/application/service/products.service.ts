import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductPaginationDto } from '../dto/product-pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    const response = await this.productRepository.createProduct(
      createProductDto,
    );
    return {
      message: response,
    };
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
    return this.productRepository.findProductById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.updateProduct(id, updateProductDto);
  }

  async remove(id: number) {
    const response = await this.productRepository.deleteProduct(id);
    return {
      message: response,
    };
  }
}
