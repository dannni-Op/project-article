import { Injectable } from '@nestjs/common';
import { ArticleCategoryCreateDto } from 'src/dto/article-category-dto/article-category.create.dto';
import { ArticleCategoryUpdateDto } from 'src/dto/article-category-dto/article-category.update.dto';
import { ArticleCategory } from 'src/entities/article-category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ArticleCategoryRepository extends Repository<ArticleCategory> {
  constructor(private dataSource: DataSource) {
    super(ArticleCategory, dataSource.createEntityManager());
  }

  async createArticleCategory(
    userId: number,
    request: ArticleCategoryCreateDto,
  ): Promise<ArticleCategory> {
    const ett = this.dataSource.createEntityManager();
    const categoryEtt = ett.create(ArticleCategory, request);
    const category = await ett.save(categoryEtt);
    return category;
  }

  async getByName(name: string): Promise<ArticleCategory> {
    const ett = this.dataSource.createEntityManager();
    const articleCategory = await ett.findOne(ArticleCategory, {
      where: {
        name,
      },
    });

    return articleCategory;
  }

  async getById(id: number): Promise<ArticleCategory> {
    const ett = this.dataSource.createEntityManager();
    const articleCategory = await ett.findOne(ArticleCategory, {
      where: {
        id,
      },
    });

    return articleCategory;
  }

  async updateArticleCategory(
    id: number,
    request: ArticleCategoryUpdateDto,
  ): Promise<ArticleCategory> {
    const ett = this.dataSource.createEntityManager();
    const articleCategory = await ett.update(ArticleCategory, id, request);
    return await ett.findOne(ArticleCategory, {
      where: {
        id,
      },
    });
  }

  async getByIdWithRelations(id: number): Promise<ArticleCategory> {
    const ett = this.dataSource.createEntityManager();
    const articleCategory = await ett.findOne(ArticleCategory, {
      where: {
        id,
      },
      relations: ['articles'],
    });

    return articleCategory;
  }

  async deleteArticleCategory(id: number): Promise<boolean> {
    const ett = this.dataSource.createEntityManager();
    const articleCategory = await ett.delete(ArticleCategory, id);

    return true;
  }
}
