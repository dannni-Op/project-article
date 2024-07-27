import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryController } from './article-category.controller';
import { ArticleCategoryRepository } from 'src/repositories/article-category.repository';
import { ArticleCategory } from 'src/entities/article-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategory])],
  providers: [ArticleCategoryService, ArticleCategoryRepository],
  controllers: [ArticleCategoryController],
  exports: [ArticleCategoryRepository],
})
export class ArticleCategoryModule {}
