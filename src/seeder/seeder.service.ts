import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../shared/database/prisma.service';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    console.log('Resetting database...');
    // await this.resetDatabase();
    // await this.seed();
    // console.log('Database seeding completed.');
  }

  async resetDatabase() {
    await this.prisma.$transaction([
      this.prisma.transactionContent.deleteMany({}),
      this.prisma.transaction.deleteMany({}),
      this.prisma.product.deleteMany({}),
      this.prisma.category.deleteMany({}),
      this.prisma.coupon.deleteMany({}),
      this.prisma.userRole.deleteMany({}),
      this.prisma.role.deleteMany({}),
      this.prisma.user.deleteMany({}),
    ]);

    // Reiniciar los autoincrementos (solo funciona en MySQL)
    await this.prisma.$executeRawUnsafe(`ALTER TABLE TransactionContent AUTO_INCREMENT = 1`);
    await this.prisma.$executeRawUnsafe(`ALTER TABLE Transaction AUTO_INCREMENT = 1`);
    await this.prisma.$executeRawUnsafe(`ALTER TABLE Product AUTO_INCREMENT = 1`);
    await this.prisma.$executeRawUnsafe(`ALTER TABLE Category AUTO_INCREMENT = 1`);
    await this.prisma.$executeRawUnsafe(`ALTER TABLE Coupon AUTO_INCREMENT = 1`);
    await this.prisma.$executeRawUnsafe(`ALTER TABLE UserRole AUTO_INCREMENT = 1`);
    await this.prisma.$executeRawUnsafe(`ALTER TABLE Role AUTO_INCREMENT = 1`);
    await this.prisma.$executeRawUnsafe(`ALTER TABLE User AUTO_INCREMENT = 1`);
  }

  async seed() {
    await this.prisma.category.createMany({
      data: categories,
    });
    await this.prisma.product.createMany({
      data: products
    });
    console.log('Seeding data...');

  }
}
