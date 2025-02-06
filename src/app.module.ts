import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { PrismaService } from './shared/database/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CategoriesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
