import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity('blogs')
export class Blogs {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  title!: string;

  @Column({ type: 'varchar', nullable: false })
  description!: string;

  @ManyToOne(() => Users, (user) => user.blogs, {
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'user_id' })
  author!: Users;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;
}
// 23cfe3b0-5392-4cb0-b7be-3c07fc49e42c

// figure out how we can see whether blog belongs to current user or not