import { IsString, Length, IsOptional } from 'class-validator';

export class ArticleCategoryUpdateDto {
  @IsString()
  @IsOptional()
  @Length(1, 255)
  name?: string;
}
