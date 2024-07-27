import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryController } from './article-category.controller';
import { ArticleCategoryRepository } from 'src/repositories/article-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategory])],
  providers: [ArticleCategoryService, ArticleCategoryRepository],
  controllers: [ArticleCategoryController],
  exports: [],
})
export class ArticleCategory {}
