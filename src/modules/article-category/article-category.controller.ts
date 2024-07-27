import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ArticleCategory } from 'src/entities/article-category.entity';
import { ArticleCategoryService } from './article-category.service';

@Controller('/api/article-categories')
export class ArticleCategoryController {
  constructor(private articleCateogryService: ArticleCategoryService) {}

  @Post()
  async create(): Promise<ArticleCategory> {
    const articleCategory = await this.articleCateogryService.create({
      name: 'food',
    });
    return articleCategory;
  }

  @Get()
  //search by name
  async search() {}

  @Get()
  //get by id
  //dengan list article
  async get() {}

  @Put()
  //update by id
  async update() {}

  @Delete()
  //delete by id
  //bisa didelete jika belum punya artikel
  async delete() {}
}
