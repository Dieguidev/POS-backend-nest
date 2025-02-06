import { Module } from '@nestjs/common';

import { CategoriesController } from './infrastructure/controller/categories.controller';
import { CategoriesService } from './application/service/categories.service';
import { CategoryRepository } from './domain/repository/CategoryRepository';
import { PrismaCategoryRepository } from './infrastructure/repository/db/prisma-category.repository.ts';
import { PrismaService } from 'src/shared/database/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository
    },
    PrismaService
  ],
  imports: [AuthModule]
})
export class CategoriesModule {}
