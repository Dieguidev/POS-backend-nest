import { CreateCategoryDto } from "../../application/dto/create-category.dto";
import { Category } from "../entities/category.entity";

export interface CategoryRepository {
  createCategory(dto: CreateCategoryDto): Promise<string>;
  updateCategory(id: number, name: string): Promise<void>;
  deleteCategory(id: number): Promise<void>;
  findCategoryById(id: number): Promise<Category>;
  findAllCategories(): Promise<Category[]>;
}

