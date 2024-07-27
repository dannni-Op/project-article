import { IsNotEmpty, IsString, IsPositive, IsOptional } from 'class-validator';

export class ArticleUpdateDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
