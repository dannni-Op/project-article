import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article_categories')
export class ArticleCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
