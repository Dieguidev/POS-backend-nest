import { Product } from "../entities/product.entity";
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { PaginationDto } from "src/common/dto/pagination.dto";

export abstract class ProductRepository {
  abstract createProduct(createproductDto: CreateProductDto): Promise<Product>;
  abstract updateProduct(): Promise<void>;
  abstract deleteProduct(): Promise<void>;
  abstract findProductById(): Promise<void>;
  abstract findAllProducts(paginationDto: PaginationDto): Promise<Product[]>;
  abstract countAllProducts(): Promise<number>;
}
