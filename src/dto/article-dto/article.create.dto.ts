import { IsNotEmpty, IsString, IsPositive, IsNumber } from 'class-validator';

export class ArticleCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
