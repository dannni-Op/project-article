import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from 'src/entities/article.entity';
import { ArticleCreateDto } from 'src/dto/article-dto/article.create.dto';

@Controller('/api/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  async create(): Promise<Article> {
    const request = {
      title: 'test',
      description: 'test',
      authorId: 1,
      categoryId: 1,
    };
    const article = await this.articleService.create(request);

    return article;
  }

  @Get()
  //search by category name, title, author
  async search() {}

  @Get()
  //get by id
  async get() {}

  @Put()
  //update article by id
  async update() {}

  @Delete()
  //delete by id
  async delete() {}
}
