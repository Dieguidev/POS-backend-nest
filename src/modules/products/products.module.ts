import { Module } from '@nestjs/common';
import { ProductsService } from './application/service/products.service';
import { ProductsController } from './infrastructure/controller/products.controller';
import { AuthModule } from '../auth/auth.module';
import { ProductRepository } from './domain/repositories/ProductRepository';
import { PrismaProductRepository } from './infrastructure/repository/prisma-product.repository';
import { PrismaService } from 'src/shared/database/prisma.service';
import { PrismaModule } from 'src/shared/database/prisma.module';
import { UploadImageModule } from '../upload-image/upload-image.module';


@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository
    },

  ],
  imports: [AuthModule, PrismaModule, UploadImageModule]
})
export class ProductsModule {}
