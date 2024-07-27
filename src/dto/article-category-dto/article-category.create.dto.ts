import { IsString, Length, IsNotEmpty } from 'class-validator';

export class ArticleCategoryCreateDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;
}
