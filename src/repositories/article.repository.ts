import { Injectable } from '@nestjs/common';
import { ArticleCreateDto } from 'src/dto/article-dto/article.create.dto';
import { Article } from 'src/entities/article.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(private dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async createArticle(request: ArticleCreateDto): Promise<Article> {
    const ett = this.dataSource.createEntityManager();
    const articleEtt = ett.create(Article, request as any);
    const article = await ett.save(articleEtt);
    return article;
  }
}
