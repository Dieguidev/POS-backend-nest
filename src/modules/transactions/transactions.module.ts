import { Module } from '@nestjs/common';
import { TransactionsController } from './infrastructure/controller/transactions.controller';
import { TransactionsService } from './application/service/transactions.service';
import { TransactionsRepository } from './domain/repositories/TransactionsRepository';
import { PrismaTransactionsRepository } from './infrastructure/repositories/prisma-transaction.repository';
import { PrismaModule } from 'src/shared/database/prisma.module';
import { CouponsModule } from '../coupons/coupons.module';



@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: TransactionsRepository,
      useClass: PrismaTransactionsRepository
    }
  ],
  imports: [PrismaModule, CouponsModule],
})
export class TransactionsModule {}
