import { IsNotEmpty, IsString, IsPositive, IsOptional } from 'class-validator';

export class ArticleSearchDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  category: string;
}
