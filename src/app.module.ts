import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/database/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { SeederModule } from './seeder/seeder.module';


@Module({
  imports: [CategoriesModule, AuthModule, PrismaModule, ProductsModule, TransactionsModule, CouponsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
