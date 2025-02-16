import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/database/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { MemoryMonitorModule } from './modules/memory-monitor';
import { UploadImageModule } from './modules/upload-image/upload-image.module';

@Module({
  imports: [
    CategoriesModule,
    AuthModule,
    PrismaModule,
    ProductsModule,
    TransactionsModule,
    CouponsModule,
    MemoryMonitorModule,
    UploadImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
