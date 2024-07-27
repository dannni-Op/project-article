import { Injectable } from '@nestjs/common';
import { ArticleCategoryCreateDto } from 'src/dto/article-category-dto/article-category.create.dto';
import { ArticleCategory } from 'src/entities/article-category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ArticleCategoryRepository extends Repository<ArticleCategory> {
  constructor(private dataSource: DataSource) {
    super(ArticleCategory, dataSource.createEntityManager());
  }

  async createCategory(
    request: ArticleCategoryCreateDto,
  ): Promise<ArticleCategory> {
    const ett = this.dataSource.createEntityManager();
    const categoryEtt = ett.create(ArticleCategory, request);
    const category = await ett.save(categoryEtt);
    return category;
  }
}
