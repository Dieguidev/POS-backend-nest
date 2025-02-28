import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionsRepository } from '../../domain/repositories/TransactionsRepository';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { CouponsService } from '../../../coupons/coupons.service';

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly couponsService: CouponsService,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<string> {
    const transaction = await this.prisma.$transaction(async (prisma) => {
      const productIds = createTransactionDto.contents.map(
        (content) => content.productId,
      );
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      const productMap = new Map(products.map((p) => [p.id, p]));

      const errors = []

      for (const content of createTransactionDto.contents) {
        const product = productMap.get(content.productId);
        if (!product) {
          errors.push(`El producto con el id ${content.productId} no existe`);
          throw new NotFoundException(
            errors
          );
        }
        if (product.inventory < content.quantity) {
          errors.push(`El articulo ${product.name} excede la cantidad disponible`);
          throw new BadRequestException(
            errors
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

      const total =
        createTransactionDto.contents.reduce(
          (acc, content) =>
            acc + Math.round(content.price * 100) * content.quantity,
          0,
        ) / 100;

      let couponName: string;
      let discount: number;

      if (createTransactionDto.coupon) {
        const coupon = await this.couponsService.applyCoupon(
          createTransactionDto.coupon,
        );
        couponName = coupon.name;

        discount = Math.round((coupon.percentage / 100) * total * 100) / 100;
      }

      return prisma.transaction.create({
        data: {
          total,
          coupon: couponName,
          discount,
          contents: {
            createMany: {
              data: createTransactionDto.contents,
            },
          },
        },
        include: { contents: true },
      });
    });

    return "Transacción generada con éxito";
  }
  async findAllTransactions(date: Date): Promise<TransactionEntity[]> {
    const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));

    const transactions = await this.prisma.transaction.findMany({
      where: {
        transactionDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: { contents: {
        include: { product: true }
      } },
    });
    return transactions;
  }
  async findOneTransaction(id: number): Promise<TransactionEntity> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: { contents: true },
    });
    if (!transaction) {
      throw new NotFoundException(`Transacción no encontrada`);
    }
    return transaction;
  }
  updateTransaction(): Promise<TransactionEntity> {
    throw new Error('Method not implemented.');
  }

  async removeTransaction(id: number): Promise<string> {
    await this.prisma.$transaction(async (prisma) => {
      const transaction = await this.findOneTransaction(id);

      await Promise.all(
        transaction.contents.map((content) =>
          prisma.product.update({
            where: { id: content.productId },
            data: { inventory: { increment: content.quantity } },
          }),
        ),
      );

      await prisma.transactionContent.deleteMany({
        where: { transactionId: transaction.id },
      });

      await prisma.transaction.delete({
        where: { id },
      });
    });
    return 'venta eliminada';
  }
}
