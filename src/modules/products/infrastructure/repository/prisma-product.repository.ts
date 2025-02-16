import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductPaginationDto } from '../../application/dto/product-pagination.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto): Promise<String> {
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

    return 'Producto Agregado correctamente';
  }
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { categoryId, inventory, name, price } = updateProductDto;
    if (categoryId) {
      const category = await this.prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });
      if (!category) {
        throw new NotFoundException('Categoria no encontrada');
      }
    }

    await this.findProductById(id);
    return await this.prisma.product.update({
      where: { id },
      data: {
        categoryId,
        inventory,
        name,
        price,
      },
    });
  }
  async deleteProduct(id: number): Promise<string> {
    await this.findProductById(id);
    await this.prisma.product.delete({ where: { id } });
    return 'Producto eliminado';
  }
  async findProductById(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: { select: { name: true, id: true } } },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }
  async findAllProducts(
    productPaginationDto: ProductPaginationDto,
  ): Promise<Product[]> {
    const { limit = 10, page = 1, category_id } = productPaginationDto;
    const skip = (page - 1) * limit;

    const products = await this.prisma.product.findMany({
      where: { categoryId: category_id ? category_id : undefined },
      include: {
        category: category_id
          ? { select: { name: true, id: true } }
          : undefined,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    return products;
  }
  async countAllProducts(category_id: number): Promise<number> {
    return await this.prisma.product.count({
      where: { categoryId: category_id ? category_id : undefined },
    });
  }
}
