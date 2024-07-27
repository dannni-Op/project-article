import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class ArticleCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  categoryId: number;
}
