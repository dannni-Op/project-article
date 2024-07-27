import { Injectable } from '@nestjs/common';
import { ArticleCreateDto } from 'src/dto/article-dto/article.create.dto';
import { ArticleSearchDto } from 'src/dto/article-dto/article.search.dto';
import { ArticleUpdateDto } from 'src/dto/article-dto/article.update.dto';
import { Article } from 'src/entities/article.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(private dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async createArticle(
    usserId: number,
    request: ArticleCreateDto,
  ): Promise<Article> {
    const ett = this.dataSource.createEntityManager();
    const articleEtt = ett.create(Article, {
      ...request,
      authorId: {
        id: usserId,
      },
    } as any);
    const article = await ett.save(articleEtt);
    return article;
  }

  async getById(userId: number, id: number): Promise<Article> {
    const ett = this.dataSource.createEntityManager();
    const article = await ett.findOne(Article, {
      where: {
        id,
        authorId: userId,
      },
    });

    return article;
  }

  async deleteArticle(id: number): Promise<boolean> {
    const ett = this.dataSource.createEntityManager();
    await ett.delete(Article, id);
    return true;
  }

  async updateArticle(id: number, request: ArticleUpdateDto): Promise<Article> {
    const ett = this.dataSource.createEntityManager();
    await ett.update(Article, id, request);
    const article = await ett.findOne(Article, {
      where: {
        id,
      },
    });

    return article;
  }

  async searchArticles(request: ArticleSearchDto): Promise<Article[]> {
    const ett = this.dataSource.createEntityManager();
    const query = ett
      .createQueryBuilder(Article, 'article')
      .innerJoin('article.author', 'user')
      .innerJoin('article.category', 'articleCategory');

    if (request.author) {
      query.andWhere('user.name LIKE :name', { name: `%${request.author}%` });
    }
    if (request.category) {
      query.andWhere('articleCategory.name LIKE :name', {
        name: `%${request.category}%`,
      });
    }
    if (request.title) {
      query.andWhere('article.title LIKE :title', {
        title: `%${request.title}%`,
      });
    }

    const articles = await query.getMany();

    return articles;
  }
}
