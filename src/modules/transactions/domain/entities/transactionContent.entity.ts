import { Product } from "src/modules/products/domain/entities/product.entity";

export class TransactionContentEntity {
  id: number;
  quantity: number;
  price: number;
  product: Product;
  productId: number;
}
