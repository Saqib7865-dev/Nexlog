import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/:userId')
  async getBlogs(@Param('userId') userId: string) {
    return await this.blogService.getBlogs(userId);
  }

  @Post('/:userId')
  async create(@Param('userId') userId: string, @Body() reqPayload) {
    return await this.blogService.create(reqPayload, userId);
  }

  @Patch('/:userId')
  async edit(@Body() reqPayload, @Param('userId') userId: string) {
    return await this.blogService.edit(reqPayload, userId);
  }

  @Delete('/:userId')
  async delete(
    @Param('userId') userId: string,
    @Body('blogId') blogId: string,
  ) {
    return await this.blogService.delete(blogId, userId);
  }
}
