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

  async create(createTransactionDto: CreateTransactionDto) {
    const response = await this.transactionsRepository.createTransaction(createTransactionDto);
    console.log(response);

    return { message: response}
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
    return this.transactionsRepository.removeTransaction(id);
  }
}
