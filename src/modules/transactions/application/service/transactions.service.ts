import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from '../../domain/repositories/TransactionsRepository';
import { isValid, parseISO } from 'date-fns';
import { MemoryMonitorService } from 'src/modules/memory-monitor';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly memoryMonitor: MemoryMonitorService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const antes = this.memoryMonitor.getMemorySnapshot();
    const response = await this.transactionsRepository.createTransaction(
      createTransactionDto,
    );
    const despues = this.memoryMonitor.getMemorySnapshot();
    console.log('Diferencia:', {
      antes: antes.heap.used,
      despues: despues.heap.used,
    });
    return { message: response };
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
