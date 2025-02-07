import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new Transaction';
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
