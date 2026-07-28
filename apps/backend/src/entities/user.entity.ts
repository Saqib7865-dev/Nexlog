import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Blogs } from './blog.entity';

export enum UserRole {
  ADMIN = 'Admin',
  CREATOR = 'creator',
  USER = 'USER',
}

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lastName!: string | null;

  @Column()
  @IsEmail({}, { message: 'Please enter a valid email' })
  @IsNotEmpty()
  email!: string;

  @Column()
  @IsString({ message: 'Please enter a valid password' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password cannot exceed 32 characters' })
  password!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  userRole!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Blogs, (Blog) => Blog.author, {
    nullable: true,
    cascade: true,
  })
  blogs?: Blogs[];
}
