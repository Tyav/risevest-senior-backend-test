import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200, nullable: false })
  title!: string;

  @Column('text', { nullable: true })
  content?: string;

  @ManyToOne(() => User, user => user.posts)
  user!: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments?: Comment[];

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt!: Date;

}