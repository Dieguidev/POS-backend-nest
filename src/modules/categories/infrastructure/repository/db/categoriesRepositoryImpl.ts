import { Injectable } from "@nestjs/common";
import { Category } from "src/modules/categories/domain/entities/category.entity";
import { CategoryRepository } from "src/modules/categories/domain/repository/CategoryRepository";

@Injectable()
export class CategoriesRepositoryImpl implements CategoryRepository {
  createCategory(name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateCategory(id: number, name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteCategory(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findCategoryById(id: number): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  findAllCategories(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }

}
