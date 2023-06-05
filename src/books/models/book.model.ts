import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category.model';

@Entity({ name: 'books' })
export class Book {
  @PrimaryColumn()
  id?: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  readCount: number;

  @Column({ nullable: false, default: 0 })
  viewCount: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  coverImage: string;

  @Column({ nullable: false })
  fileUrl: string;

  @ManyToOne((type) => Category)
  category: Category;

  @Column('jsonb', { nullable: false, default: '[]' })
  tags: string[];

  @Column({ nullable: false })
  readTime: number; // in minutes

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
