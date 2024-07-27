import { Injectable } from '@nestjs/common';
import { ArticleCreateDto } from 'src/dto/article-dto/article.create.dto';
import { Article } from 'src/entities/article.entity';
import { ArticleRepository } from 'src/repositories/article.repository';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  async create(request: ArticleCreateDto): Promise<Article> {
    //return the article

    const article = await this.articleRepository.createArticle(request);
    return article;
  }
}
