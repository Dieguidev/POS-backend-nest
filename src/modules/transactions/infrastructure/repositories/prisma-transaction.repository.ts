import { Injectable } from "@nestjs/common";
import { TransactionsRepository } from "../../domain/repositories/TransactionsRepository";
import { TransactionEntity } from "../../domain/entities/transaction.entity";

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  createTransaction(): Promise<TransactionEntity> {
    throw new Error("Method not implemented.");
  }
  findAllTransactions(): Promise<TransactionEntity> {
    throw new Error("Method not implemented.");
  }
  findOneTransaction(): Promise<TransactionEntity> {
    throw new Error("Method not implemented.");
  }
  updateTransaction(): Promise<TransactionEntity> {
    throw new Error("Method not implemented.");
  }
  removeTransaction(): Promise<string> {
    throw new Error("Method not implemented.");
  }

}
