import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { PrismaService } from "src/shared/database/prisma.service";

@Injectable()
export class PrismaProductRepository implements ProductRepository{
  constructor(private readonly prisma: PrismaService) {}
  createProduct(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateProduct(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteProduct(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findProductById(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAllProducts(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
