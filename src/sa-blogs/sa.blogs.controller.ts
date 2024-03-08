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
import { PostService } from "../posts/post.service";
import { createdPosForBlogtDtoType, paramsPostPaginatorType } from "../posts/post.schema";

@Controller("sa/blogs")
export class SuperAdminBlogsController {
  constructor(
    protected suBlogsService: SuperAdminBlogService,
    protected postService: PostService
    ) {}

  @UseGuards(BasicAuthGuard)
  @Post()
  async createBlog(@Body() body: createdDtoBlogType) {
    return this.suBlogsService.create(body);
  }

  @UseGuards(BasicAuthGuard)
  @Get()
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

  @UseGuards(BasicAuthGuard)
  @Post(':blogId/posts')
  async createPost(@Param('blogId') blogId: string, @Body() body: createdPosForBlogtDtoType){
      const post = await this.postService.createForBlog(body,blogId)
      if(!post) throw new NotFoundException();
      return post
  }
  @UseGuards(BasicAuthGuard)
  @Get(':blogId/posts')
  async findPostsByBlogId(@Param('blogId') blogId: string, @Query() params: paramsPostPaginatorType & {userId: string}){
      // const post = await this.postService.findPostsForBlog(params,blogId)
      // if(!post) throw new NotFoundException();
      // return post
  }
}
