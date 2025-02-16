import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../../application/dto/create-product.dto';

import { ProductPaginationDto } from '../../application/dto/product-pagination.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

export abstract class ProductRepository {
  abstract createProduct(createproductDto: CreateProductDto): Promise<String>;
  abstract updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
  abstract deleteProduct(id: number): Promise<string>;
  abstract findProductById(id: number): Promise<Product>;
  abstract findAllProducts(
    productPaginationDto: ProductPaginationDto,
  ): Promise<Product[]>;
  abstract countAllProducts(category_id: number): Promise<number>;
}
