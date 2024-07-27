import { IsNotEmpty, IsString, IsPositive } from 'class-validator';

export class ArticleCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  categoryId: number;
}
