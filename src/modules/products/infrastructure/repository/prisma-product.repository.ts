import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../application/dto/create-product.dto';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, categoryId, inventory } = createProductDto;
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException('Categoria no encontrada');
    }
    const product = await this.prisma.product.create({
      data: {
        name,
        price,
        inventory,
        categoryId: category.id,
      },
    });

    return product;
  }
  updateProduct(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteProduct(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findProductById(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAllProducts(): Promise<Product[]> {
    const products = this.prisma.product.findMany({include:{category:true}});
    return products;
  }
}
