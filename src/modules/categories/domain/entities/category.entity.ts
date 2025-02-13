import { Product } from "src/modules/products/domain/entities/product.entity";


export class Category {
  id: number;
  name: string;

  createdAt: Date;
  updatedAt: Date;
  products?: Product[]

}

