import { Injectable } from '@nestjs/common';
import { ArticleCategoryCreateDto } from 'src/dto/article-category-dto/article-category.create.dto';
import { ArticleCategory } from 'src/entities/article-category.entity';
import { ArticleCategoryRepository } from 'src/repositories/article-category.repository';

@Injectable()
export class ArticleCategoryService {

    constructor(private articleCategoryRepository: ArticleCategoryRepository) {}

    async create(request: ArticleCategoryCreateDto): Promise<ArticleCategory>
    {
        //return article category

        const articleCategory = await this.articleCategoryRepository.createCategory(request);
        return articleCategory;
    }
}
