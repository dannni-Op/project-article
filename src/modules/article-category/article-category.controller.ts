import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleCategory } from 'src/entities/article-category.entity';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryUpdateDto } from 'src/dto/article-category-dto/article-category.update.dto';
import { ArticleCategoryCreateDto } from 'src/dto/article-category-dto/article-category.create.dto';
import { NothingChangesMessage } from 'types/nothing-changes.type';
import { Auth } from 'src/commons/decorators/auth.decorator';

@Controller('/api/article-categories')
export class ArticleCategoryController {
  constructor(private articleCateogryService: ArticleCategoryService) {}

  @Post()
  async create(
    @Auth() user: any,
    @Body() request: ArticleCategoryCreateDto,
  ): Promise<ArticleCategory> {
    const articleCategory = await this.articleCateogryService.create(
      user.sub,
      request,
    );
    return articleCategory;
  }

  @Get()
  //search by name
  async search(@Query('name') name: string) {
    const articleCategory = await this.articleCateogryService.getByName(name);
    return articleCategory;
  }

  @Get('/:id')
  //get by id
  //dengan list article
  async get(@Param('id', ParseIntPipe) id: number): Promise<ArticleCategory> {
    const articleCategory = await this.articleCateogryService.getById(id);
    return articleCategory;
  }

  @Put('/:id')
  //update by id
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: ArticleCategoryUpdateDto,
  ): Promise<ArticleCategory | NothingChangesMessage> {
    console.log(request);
    const articleCategory = await this.articleCateogryService.update(
      id,
      request,
    );
    return articleCategory;
  }

  @Delete('/:id')
  //delete by id
  //bisa didelete jika belum punya artikel
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    const articleCategory = await this.articleCateogryService.delete(id);
    return articleCategory;
  }
}
