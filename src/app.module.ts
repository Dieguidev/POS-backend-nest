import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { PrismaService } from './shared/database/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/application/service/auth.service';
import { PrismaModule } from './shared/database/prisma.module';
import { ProductsModule } from './modules/products/products.module';


@Module({
  imports: [CategoriesModule, AuthModule, PrismaModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
