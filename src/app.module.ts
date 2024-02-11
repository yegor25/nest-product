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
import { PostValidator } from './posts/post.validate';
import { CheckRefreshToken } from './auth/middlewares/check-refreshToken.middleware';
import { TokenSchema, Tokens } from './tokens/token.schema';
import { TokenService } from './tokens/token.service';
import { TokenRepository } from './tokens/token.repository';
import { SecurityDevices, SecurityDevicesSchema } from './securityDevices/securityDevices.schema';
import { SecurityDevicesController } from './securityDevices/securityDevices.controller';
import { SecurityDevicesRepository } from './securityDevices/securityDevices.repository';
import { SecurityDevicesService } from './securityDevices/securityDevices.service';
import { UserRequestInfo, UserRequestInfoSchema } from './requestUserInfo/requestUserInfo.schema';
import { RequestUserInfoRepository } from './requestUserInfo/requestUserInfo.repository';
import { RequestUserInfoService } from './requestUserInfo/requestUserInfoService';
import { RateLimiting } from './requestUserInfo/middleware/rateLimiting.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperUsersModule } from './super-users/superUsers.module';
import { UserSqlRepository } from './users/userSql.repository';
import { DataConfirmationRepository } from './users/dataConfirmation.repository';
import { TokenSqlRepository } from './tokens/tokenSql.repository';
import { SecurityDevicesSqlRepository } from './securityDevices/securityDevicesSql.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: "10s"}
    }),
    
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "ep-wandering-firefly-a2ymf77e.eu-central-1.aws.neon.tech",
      port: 5432,
      ssl: true,
      username: "egorlesnicij86",
      password: "VBqk7GPv8LIh",
      synchronize: false,
      autoLoadEntities: false,
      database: "neondb"
    }),
    // MongooseModule.forRoot(
    //   'mongodb+srv://lesnichij94:admin2411@cluster0.9f1tjb3.mongodb.net/nest?retryWrites=true&w=majority',
    // ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {name: Blog.name, schema: BlogSchema},
      {name: Post.name, schema: PostSchema},
      {name: Comments.name, schema: CommentsSchema},
      {name: LikesPost.name, schema: LikePostSchema},
      {name: Tokens.name, schema: TokenSchema},
      {name:SecurityDevices.name, schema:SecurityDevicesSchema},
      {name: UserRequestInfo.name, schema:UserRequestInfoSchema}
    ]),
    SuperUsersModule,
  ],
  
  controllers: [AppController, TestingController, BlogController, PostController, UserController, AuthController, CommentController,SecurityDevicesController],
  providers: [AppService,  TestingService, BlogService, BlogRepository, PostRepository, PostService, UserService,UserRepository, AuthService, LocalStrategy, BasicStrategy,JwtStrategy,CommentService, CommentsRepository, PostLikeRepository, PostLikeService, PostValidator, TokenService, TokenRepository,SecurityDevicesRepository,SecurityDevicesService, RequestUserInfoRepository, RequestUserInfoService, UserSqlRepository, DataConfirmationRepository, TokenSqlRepository,SecurityDevicesSqlRepository],

})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckGuess).forRoutes('posts','blogs','comments'),
    consumer.apply(CheckRefreshToken).forRoutes('auth/logout','auth/refresh-token','security'),
    consumer.apply(RateLimiting).forRoutes('auth/registration-confirmation','auth/registration-email-resending','auth/login','auth/registration')
  }
}
