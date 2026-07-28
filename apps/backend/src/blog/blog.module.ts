import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blogs } from '../entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Users } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blogs, Users])],
  providers: [BlogService, UserService],
  controllers: [BlogController],
})
export class BlogModule {}
