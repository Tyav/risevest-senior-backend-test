import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('Comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Post, post => post.comments)
  post!: Post;

  @ManyToOne(() => User, user => user.comments)
  user!: User;

  @Column('text', { nullable: true })
  content?: string;


  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

}