import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Article } from './article.entity';

@Entity({ name: 'users' })
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  // @Column({ type: 'varchar', length: 255, nullable: false })
  // email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refresh_token?: string;

  @OneToMany(() => Article, (article) => article.authorId)
  articles: Article[];
}
