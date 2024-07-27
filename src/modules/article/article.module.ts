import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from 'src/repositories/article.repository';
import { ArticleCategoryModule } from '../article-category/article-category.module';

@Module({
  imports: [ArticleCategoryModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
  exports: [],
})
export class ArticleModule {}
