import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../../domain/repository/CategoryRepository';



@Injectable()
export class CategoriesService {

  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.findAllCategories();
  }

  findOne(id: number, products?: string) {
    return this.categoryRepository.findCategoryById(id, products);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.updateCategory(id, updateCategoryDto.name);
  }

  remove(id: number) {
    return this.categoryRepository.deleteCategory(id);
  }
}
