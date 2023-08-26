import 'reflect-metadata';
import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn, VersionColumn } from 'typeorm';


@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', unique: true, primaryKeyConstraintName: 'IDX_users_id' })
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

  @VersionColumn({
    type: 'int',
  })
    version!: number;
}