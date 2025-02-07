import { Module } from '@nestjs/common';

import { CategoriesController } from './infrastructure/controller/categories.controller';
import { CategoriesService } from './application/service/categories.service';
import { CategoryRepository } from './domain/repository/CategoryRepository';
import { PrismaCategoryRepository } from './infrastructure/repository/db/prisma-category.repository.ts';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from 'src/shared/database/prisma.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository
    },
  ],
  imports: [AuthModule, PrismaModule]
})
export class CategoriesModule {}
