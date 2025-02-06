import { CreateCategoryDto } from "../../application/dto/create-category.dto";
import { Category } from "../entities/category.entity";

export abstract class CategoryRepository {
  abstract  createCategory(dto: CreateCategoryDto): Promise<string>;
  abstract  updateCategory(id: number, name: string): Promise<void>;
  abstract  deleteCategory(id: number): Promise<void>;
  abstract  findCategoryById(id: number): Promise<Category>;
  abstract  findAllCategories(): Promise<Category[]>;
}

