import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionsRepository } from '../../domain/repositories/TransactionsRepository';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(createTransactionDto: CreateTransactionDto,): Promise<TransactionEntity> {
    const transaction = await this.prisma.$transaction(async (prisma) => {
      const productIds = createTransactionDto.contents.map((content) => content.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      const productMap = new Map(products.map((p) => [p.id, p]));

      for (const content of createTransactionDto.contents) {
        const product = productMap.get(content.productId);
        if (!product) {
          throw new NotFoundException(
            `Product with id ${content.productId} not found`,
          );
        }
        if (product.inventory < content.quantity) {
          throw new BadRequestException(
            `Product with id ${content.productId} has insufficient stock`,
          );
        }
      }

      await Promise.all(
        createTransactionDto.contents.map((content) =>
          prisma.product.update({
            where: { id: content.productId },
            data: { inventory: { decrement: content.quantity } },
          }),
        ),
      );

      return prisma.transaction.create({
        data: {
          total: createTransactionDto.total,
          contents: {
            createMany: {
              data: createTransactionDto.contents,
            },
          },
        },
        include: { contents: true },
      });
    });

    return transaction;
  }
  findAllTransactions(): Promise<TransactionEntity> {
    throw new Error('Method not implemented.');
  }
  findOneTransaction(): Promise<TransactionEntity> {
    throw new Error('Method not implemented.');
  }
  updateTransaction(): Promise<TransactionEntity> {
    throw new Error('Method not implemented.');
  }
  removeTransaction(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
