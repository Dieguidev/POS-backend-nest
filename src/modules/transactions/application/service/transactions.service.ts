import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from '../../domain/repositories/TransactionsRepository';

@Injectable()
export class TransactionsService {

  constructor(
    private readonly transactionsRepository: TransactionsRepository
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionsRepository.createTransaction(createTransactionDto);
  }

  findAll() {
    return `This action returns all Transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} Transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} Transaction`;
  }
}
