import { TransactionContentEntity } from "./transactionContent.entity";

export class TransactionEntity {
  id: number;
  total: number;
  transactionDate: Date;
  updatedAt: Date;
  coupon?: string;
  discount?: number;
  contents: TransactionContentEntity[];
}
