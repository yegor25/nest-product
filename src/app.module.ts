import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/user.schema';
import { TestingController } from './testing/testing.controller';
import { TestingService } from './testing/testing.service';
import { Blog, BlogSchema } from './blogs/blog.schema';
import { BlogController } from './blogs/blogs.controller';
import { BlogService } from './blogs/blog.service';
import { BlogRepository } from './blogs/blogs.repository';
import { PostController } from './posts/post.controller';
import { PostRepository } from './posts/post.repository';
import { PostService } from './posts/post.service';
import { Post, PostSchema } from './posts/post.schema';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { UserRepository } from './users/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/straregies/local.srategy';
import { AuthController } from './auth/auth.controller';
import { BasicStrategy } from './auth/straregies/auth-basic.strategy';
import { Comments, CommentsSchema } from './comments/comment.schema';
import { CommentController } from './comments/comments.controller';
import { CommentService } from './comments/comments.service';
import { CommentsRepository } from './comments/comments.repository';
import { JwtStrategy } from './auth/straregies/jwt.strategy';
import { LikePostSchema, LikesPost } from './postLikes/like.schema';
import { PostLikeRepository } from './postLikes/postLike.repository';
import { PostLikeService } from './postLikes/postLike.service';
import { CheckGuess } from './auth/middlewares/check-guess.middleware';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: "15m"}
    }),
    
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forRoot(
      'mongodb+srv://lesnichij94:admin2411@cluster0.9f1tjb3.mongodb.net/nest?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {name: Blog.name, schema: BlogSchema},
      {name: Post.name, schema: PostSchema},
      {name: Comments.name, schema: CommentsSchema},
      {name: LikesPost.name, schema: LikePostSchema}
    ]),
  ],
  controllers: [AppController, TestingController, BlogController, PostController, UserController, AuthController, CommentController],
  providers: [AppService,  TestingService, BlogService, BlogRepository, PostRepository, PostService, UserService,UserRepository, AuthService, LocalStrategy, BasicStrategy,JwtStrategy,CommentService, CommentsRepository, PostLikeRepository, PostLikeService],

})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckGuess).forRoutes('posts','blogs','comments')
  }
}
