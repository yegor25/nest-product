import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { UserRepository } from './users/user.repository';
import { UserService } from './users/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/user.schema';
import { TestingController } from './testing/testing.controller';
import { TestingService } from './testing/testing.service';
import { Blog, BlogSchema } from './blogs/blog.schema';
import { BlogController } from './blogs/blogs.controller';
import { BlogService } from './blogs/blog.service';
import { BlogRepository } from './blogs/blogs.repository';
import { LikePostSchema, LikesPost } from './postLikes/like.schema';
import { PostController } from './posts/post.controller';
import { PostRepository } from './posts/post.repository';
import { PostService } from './posts/post.service';
import { Post, PostSchema } from './posts/post.schema';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forRoot(
      'mongodb+srv://lesnichij94:admin2411@cluster0.9f1tjb3.mongodb.net/nest?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {name: Blog.name, schema: BlogSchema},
      {name: Post.name, schema: PostSchema},
      {name: LikesPost.name, schema: LikePostSchema}
    ]),
  ],
  controllers: [AppController, UserController,TestingController, BlogController, PostController],
  providers: [AppService, UserRepository, UserService, TestingService, BlogService, BlogRepository, PostRepository, PostService],
})
export class AppModule {}
