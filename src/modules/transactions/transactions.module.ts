import { Module } from '@nestjs/common';
import { TransactionsController } from './infrastructure/controller/transactions.controller';
import { TransactionsService } from './application/service/transactions.service';



@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
