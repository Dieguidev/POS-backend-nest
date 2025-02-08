import { CreateTransactionDto } from "../../application/dto/create-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";

export abstract class TransactionsRepository {
  abstract createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity>;
  abstract findAllTransactions(): Promise<TransactionEntity>;
  abstract findOneTransaction(): Promise<TransactionEntity>;
  abstract updateTransaction(): Promise<TransactionEntity>;
  abstract removeTransaction(): Promise<string>;
}
