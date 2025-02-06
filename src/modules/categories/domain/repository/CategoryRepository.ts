import { Category } from "../entities/category.entity";

export interface CategoryRepository {
  createCategory(name: string): Promise<void>;
  updateCategory(id: number, name: string): Promise<void>;
  deleteCategory(id: number): Promise<void>;
  findCategoryById(id: number): Promise<Category>;
  findAllCategories(): Promise<Category[]>;
}

