import 'reflect-metadata';
import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', primaryKeyConstraintName: 'IDX_users_id' })
    id!: string;

  @Column('varchar')
    name!: string;

  @Column({ type:'varchar' })
  @Index('IDX_users_email',{ unique: true })
    email!: string;

  @CreateDateColumn({
    type: 'timestamp', name: 'created_at'
  })
    createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp', name: 'updated_at'
  })
    updatedAt!: Date;

}