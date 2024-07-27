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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'authorId' })
  authorId: User;

  @ManyToOne(() => ArticleCategory, (articleCategory) => articleCategory.id)
  @JoinColumn({ name: 'categoryId' })
  categoryId: ArticleCategory;
}
