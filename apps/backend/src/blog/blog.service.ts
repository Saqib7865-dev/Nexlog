import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Blogs } from '../entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    private readonly UserService: UserService,
    @InjectRepository(Blogs)
    private readonly blogRepo: Repository<Blogs>,
  ) {}
  async getBlogs(userId: string): Promise<Blogs[] | null> {
    await this.UserService.findById(userId);
    const blogs = await this.blogRepo.find({
      where: { author: { id: userId } },
    });
    return blogs;
  }

  async create(reqPayload, userId: string) {
    const user = await this.UserService.findById(userId);
    const blog = this.blogRepo.create();
    blog.title = reqPayload.title;
    blog.description = reqPayload.description;
    blog.author = user;

    return await this.blogRepo.save(blog);
  }

  async edit(reqPayload, userId: string) {
    console.log(`userId: `, userId);
    console.log(`reqPayload: `, reqPayload);
    await this.UserService.findById(userId);
    const blog = await this.blogRepo.findOne({ where: { id: reqPayload.id } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    blog.title = reqPayload.title;
    blog.description = reqPayload.description;
    await this.blogRepo.save(blog);
    return {
      success: true,
      data: blog,
      message: 'Blog updated successfully',
    };
  }

  async delete(blogId: string, userId: string) {
    await this.UserService.findById(userId);
    const blog = await this.blogRepo.findOne({ where: { id: blogId } });
    if (!blog) {
      throw new NotFoundException('Blog does not exist');
    }
    await this.blogRepo.remove(blog);
    return {
      success: true,
      message: 'Blog deleted successfully',
    };
  }
}
