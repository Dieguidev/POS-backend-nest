import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from '../../domain/repositories/TransactionsRepository';
import { isValid, parseISO } from 'date-fns';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionsRepository.createTransaction(createTransactionDto);
  }

  findAll(transactionDate: string) {
    if (transactionDate) {
      const date = parseISO(transactionDate);
      if (!isValid(date)) {
        throw new BadRequestException('Fecha no válida');
      }
      return this.transactionsRepository.findAllTransactions(date);
    }
  }

  findOne(id: number) {
    return this.transactionsRepository.findOneTransaction(id);
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} Transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} Transaction`;
  }
}
