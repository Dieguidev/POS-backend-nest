export abstract class ProductRepository {
  abstract createProduct(): Promise<void>;
  abstract updateProduct(): Promise<void>;
  abstract deleteProduct(): Promise<void>;
  abstract findProductById(): Promise<void>;
  abstract findAllProducts(): Promise<void>;
}
