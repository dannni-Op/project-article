import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from 'src/entities/article.entity';
import { ArticleCreateDto } from 'src/dto/article-dto/article.create.dto';
import { ArticleUpdateDto } from 'src/dto/article-dto/article.update.dto';
import { NothingChangesMessage } from 'types/nothing-changes.type';
import { ArticleSearchDto } from 'src/dto/article-dto/article.search.dto';
import { Auth } from 'src/commons/decorators/auth.decorator';

@Controller('/api/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  async create(
    @Auth() user: any,
    @Body() request: ArticleCreateDto,
  ): Promise<Article> {
    const result = await this.articleService.create(user.sub, request);
    return result;
  }

  @Get()
  //search by category name, title, author
  async search(
    @Query('category') category: string,
    @Query('title') title: string,
    @Query('author') author: string,
  ): Promise<Article[]> {
    const request: ArticleSearchDto = {
      category,
      title,
      author,
    };
    const articles = await this.articleService.search(request);
    return articles;
  }

  @Get('/:id')
  //get by id
  async get(userId: number, @Param('id') id: number): Promise<Article> {
    const result = await this.articleService.getById(userId, id);
    return result;
  }

  @Put('/:id')
  //update article by id
  async update(
    @Auth() user: any,
    @Body() request: ArticleUpdateDto,
    @Param('id') id: number,
  ): Promise<Article | NothingChangesMessage> {
    const article = await this.articleService.update(user.sub, id, request);
    return article;
  }

  @Delete('/:id')
  //delete by id
  async delete(@Auth() user: any, @Param('id') id: number): Promise<boolean> {
    const result = await this.articleService.delete(user.sub, id);
    return result;
  }
}
