import { TransactionContentEntity } from "./transactionContent.entity";

export class TransactionEntity {
  id: number;
  total: number;
  transactionDate: Date;
  updatedAt: Date;
  contents: TransactionContentEntity[];
}
