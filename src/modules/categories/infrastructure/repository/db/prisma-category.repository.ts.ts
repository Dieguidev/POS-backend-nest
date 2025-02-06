import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/modules/categories/application/dto/create-category.dto';
import { Category } from 'src/modules/categories/domain/entities/category.entity';
import { CategoryRepository } from 'src/modules/categories/domain/repository/CategoryRepository';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(dto: CreateCategoryDto): Promise<string> {
    const { name } = dto;
    const category = await this.prisma.category.create({
      data: {
        name,
      },
    });

    if (!category) {
      throw new Error('Error creating category');
    }
    return 'Category created successfully';
  }

  updateCategory(id: number, name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteCategory(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findCategoryById(id: number): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  findAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
