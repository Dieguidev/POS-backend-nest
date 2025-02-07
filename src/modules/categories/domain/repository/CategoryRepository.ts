import { CreateCategoryDto } from "../../application/dto/create-category.dto";
import { Category } from "../entities/category.entity";

export abstract class CategoryRepository {
  abstract  createCategory(dto: CreateCategoryDto): Promise<Category>;
  abstract  updateCategory(id: number, name: string): Promise<Category>;
  abstract  deleteCategory(id: number): Promise<string>;
  abstract  findCategoryById(id: number): Promise<Category>;
  abstract  findAllCategories(): Promise<Category[]>;
}

