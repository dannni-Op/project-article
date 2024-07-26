import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArticleCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
