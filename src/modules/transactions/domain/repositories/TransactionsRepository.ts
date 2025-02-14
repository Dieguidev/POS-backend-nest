import { CreateTransactionDto } from "../../application/dto/create-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";

export abstract class TransactionsRepository {
  abstract createTransaction(createTransactionDto: CreateTransactionDto): Promise<string>;
  abstract findAllTransactions(date: Date): Promise<TransactionEntity[]>;
  abstract findOneTransaction(id: number): Promise<TransactionEntity>;
  abstract updateTransaction(): Promise<TransactionEntity>;
  abstract removeTransaction(id: number): Promise<string>;
}
