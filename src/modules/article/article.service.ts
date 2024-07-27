import { HttpException, Injectable } from '@nestjs/common';
import { ArticleCreateDto } from 'src/dto/article-dto/article.create.dto';
import { ArticleSearchDto } from 'src/dto/article-dto/article.search.dto';
import { ArticleUpdateDto } from 'src/dto/article-dto/article.update.dto';
import { Article } from 'src/entities/article.entity';
import { ArticleCategoryRepository } from 'src/repositories/article-category.repository';
import { ArticleRepository } from 'src/repositories/article.repository';
import { NothingChangesMessage } from 'types/nothing-changes.type';

@Injectable()
export class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private articleCategoryRepository: ArticleCategoryRepository,
  ) {}

  async create(userId: number, request: ArticleCreateDto): Promise<Article> {
    //return the article

    const articleCategory = await this.articleCategoryRepository.getById(
      request.categoryId,
    );
    if (!articleCategory)
      throw new HttpException('Article category not found!', 404);

    const article = await this.articleRepository.createArticle(userId, request);
    return article;
  }

  async getById(userId: number, id: number): Promise<Article> {
    const article = await this.articleRepository.getById(userId, id);
    if (!article) throw new HttpException('Article not found!', 404);

    return article;
  }

  async delete(userId: number, id: number): Promise<boolean> {
    const article = await this.getById(userId, id);

    const result = await this.articleRepository.deleteArticle(id);
    return result;
  }

  async update(
    userId: number,
    id: number,
    request: ArticleUpdateDto,
  ): Promise<Article | NothingChangesMessage> {
    await this.getById(userId, id);

    if (request.description || request.title) {
      const article = await this.articleRepository.updateArticle(id, request);
      return article;
    }

    return {
      message: 'No changes were made. The resource was already up to date.',
    };
  }

  async search(request: ArticleSearchDto): Promise<Article[]> {
    const articles = await this.articleRepository.searchArticles(request);
    return articles;
  }
}
