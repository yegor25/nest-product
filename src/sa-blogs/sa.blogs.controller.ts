import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { BasicAuthGuard } from "../auth/guards/basic-auth.guard";
import {
  createdDtoBlogType,
  paramsBlogPaginatorType,
} from "../blogs/blog.schema";
import { SuperAdminBlogService } from "./sa.blogs.service";

@Controller("sa/blogs")
export class SuperAdminBlogsController {
  constructor(protected suBlogsService: SuperAdminBlogService) {}

  @UseGuards(BasicAuthGuard)
  @Post()
  async createBlog(@Body() body: createdDtoBlogType) {
    return this.suBlogsService.create(body);
  }

  async findBlogs(@Query() params: paramsBlogPaginatorType) {
    return this.suBlogsService.findBlogs(params);
  }

  @Get(":id")
  async findBlogById(@Param("id") blogId: string) {
    const blog = await this.suBlogsService.findById(blogId);
    if (!blog) throw new NotFoundException();
    return blog;
  }

  @UseGuards(BasicAuthGuard)
  @Put(":id")
  @HttpCode(204)
  async changeBlog(
    @Param("id") blogId: string,
    @Body() body: createdDtoBlogType
  ) {
    const blog = await this.suBlogsService.changeBlog(blogId, body);
    if (!blog) throw new NotFoundException();
    return;
  }

  @UseGuards(BasicAuthGuard)
  @Delete(":id")
  @HttpCode(204)
  async deleteBlog(@Param("id") blogId: string) {
    const deletedBlog = await this.suBlogsService.deleteBlogById(blogId);
    if (!deletedBlog) throw new NotFoundException();
    return;
  }
}
