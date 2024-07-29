import { HttpException, Injectable } from '@nestjs/common';
import { ArticleCategoryCreateDto } from 'src/dto/article-category-dto/article-category.create.dto';
import { ArticleCategoryUpdateDto } from 'src/dto/article-category-dto/article-category.update.dto';
import { ArticleCategory } from 'src/entities/article-category.entity';
import { ArticleCategoryRepository } from 'src/repositories/article-category.repository';
import { NothingChangesMessage } from 'types/nothing-changes.type';

@Injectable()
export class ArticleCategoryService {
  constructor(private articleCategoryRepository: ArticleCategoryRepository) {}

  async create(
    userId: number,
    request: ArticleCategoryCreateDto,
  ): Promise<ArticleCategory> {
    //return article category

    const articleCategory = await this.articleCategoryRepository.getByName(
      request.name,
    );
    if (articleCategory)
      throw new HttpException('Category name already exist', 400);

    const result =
      await this.articleCategoryRepository.createArticleCategory(request);
    return result;
  }

  async update(
    id: number,
    request: ArticleCategoryUpdateDto,
  ): Promise<ArticleCategory | NothingChangesMessage> {
    const articleCategory = await this.articleCategoryRepository.getById(id);
    if (!articleCategory)
      throw new HttpException('Article category not found!', 404);

    if (request.name) {
      const categoryName = await this.articleCategoryRepository.getByName(
        request.name,
      );

      if (categoryName && id != categoryName.id)
        throw new HttpException('Category name already exist!', 400);

      const result = await this.articleCategoryRepository.updateArticleCategory(
        id,
        request,
      );
      return result;
    }

    return {
      message: 'No changes were made. The resource was already up to date.',
    };
  }

  async getById(id: number): Promise<ArticleCategory> {
    const categoryExist = await this.articleCategoryRepository.getById(id);
    if (!categoryExist)
      throw new HttpException('Article category not found!', 404);

    const result =
      await this.articleCategoryRepository.getByIdWithRelations(id);
    return result;
  }

  async getByName(name: string): Promise<ArticleCategory> {
    const articleCategory =
      await this.articleCategoryRepository.getByName(name);
    if (!articleCategory)
      throw new HttpException('Article category not found!', 404);

    return articleCategory;
  }

  async delete(id: number): Promise<boolean> {
    const categoryExist = await this.articleCategoryRepository.getById(id);
    if (!categoryExist)
      throw new HttpException('Article category not found!', 404);

    const categoryCount = (await this.getById(id)).articles.length;
    if (categoryCount != 0)
      throw new HttpException('Cannot delete this article category!', 400);

    const result =
      await this.articleCategoryRepository.deleteArticleCategory(id);
    return result;
  }
}
