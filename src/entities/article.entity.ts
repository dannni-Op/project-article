import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ArticleCategory } from './article-category.entity';
import { IsNumber } from 'class-validator';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @IsNumber()
  authorId: number;

  @Column()
  @IsNumber()
  categoryId: number;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne(() => ArticleCategory, (articleCategory) => articleCategory.articles)
  @JoinColumn({ name: 'categoryId' })
  category: ArticleCategory;
}
