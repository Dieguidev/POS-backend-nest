import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from 'src/modules/categories/application/dto/create-category.dto';
import { Category } from 'src/modules/categories/domain/entities/category.entity';
import { CategoryRepository } from 'src/modules/categories/domain/repository/CategoryRepository';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const { name } = dto;
    const category = await this.prisma.category.create({
      data: {
        name,
      },
    });

    if (!category) {
      throw new Error('Error creating category');
    }
    return category;
  }

  async updateCategory(id: number, name: string): Promise<Category> {
    await this.findCategoryById(id);
    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
  async deleteCategory(id: number): Promise<string> {
    await this.findCategoryById(id);
    await this.prisma.category.delete({
      where: {
        id,
      },
    });
    return 'Categoria eliminada';
  }
  async findCategoryById(id: number, products?: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: products === 'true' ? {
          orderBy: {
            id: 'asc',
          }
        } : false,

      },
    });
    if (!category) {
      throw new NotFoundException('Categoria no encontrada');
    }
    return category;
  }
  findAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
