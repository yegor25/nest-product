"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./users/user.schema");
const testing_controller_1 = require("./testing/testing.controller");
const testing_service_1 = require("./testing/testing.service");
const blog_schema_1 = require("./blogs/blog.schema");
const blogs_controller_1 = require("./blogs/blogs.controller");
const blog_service_1 = require("./blogs/blog.service");
const blogs_repository_1 = require("./blogs/blogs.repository");
const post_controller_1 = require("./posts/post.controller");
const post_repository_1 = require("./posts/post.repository");
const post_service_1 = require("./posts/post.service");
const post_schema_1 = require("./posts/post.schema");
const user_controller_1 = require("./users/user.controller");
const user_service_1 = require("./users/user.service");
const user_repository_1 = require("./users/user.repository");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./auth/constants");
const auth_service_1 = require("./auth/auth.service");
const local_srategy_1 = require("./auth/straregies/local.srategy");
const auth_controller_1 = require("./auth/auth.controller");
const auth_basic_strategy_1 = require("./auth/straregies/auth-basic.strategy");
const comment_schema_1 = require("./comments/comment.schema");
const comments_controller_1 = require("./comments/comments.controller");
const comments_service_1 = require("./comments/comments.service");
const comments_repository_1 = require("./comments/comments.repository");
const jwt_strategy_1 = require("./auth/straregies/jwt.strategy");
const like_schema_1 = require("./postLikes/like.schema");
const postLike_repository_1 = require("./postLikes/postLike.repository");
const postLike_service_1 = require("./postLikes/postLike.service");
const check_guess_middleware_1 = require("./auth/middlewares/check-guess.middleware");
const post_validate_1 = require("./posts/post.validate");
const check_refreshToken_middleware_1 = require("./auth/middlewares/check-refreshToken.middleware");
const token_schema_1 = require("./tokens/token.schema");
const token_service_1 = require("./tokens/token.service");
const token_repository_1 = require("./tokens/token.repository");
const securityDevices_schema_1 = require("./securityDevices/securityDevices.schema");
const securityDevices_controller_1 = require("./securityDevices/securityDevices.controller");
const securityDevices_repository_1 = require("./securityDevices/securityDevices.repository");
const securityDevices_service_1 = require("./securityDevices/securityDevices.service");
const requestUserInfo_schema_1 = require("./requestUserInfo/requestUserInfo.schema");
const requestUserInfo_repository_1 = require("./requestUserInfo/requestUserInfo.repository");
const requestUserInfoService_1 = require("./requestUserInfo/requestUserInfoService");
const rateLimiting_middleware_1 = require("./requestUserInfo/middleware/rateLimiting.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const superUsers_module_1 = require("./super-users/superUsers.module");
const userSql_repository_1 = require("./users/userSql.repository");
const dataConfirmation_repository_1 = require("./users/dataConfirmation.repository");
const tokenSql_repository_1 = require("./tokens/tokenSql.repository");
const securityDevicesSql_repository_1 = require("./securityDevices/securityDevicesSql.repository");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(check_guess_middleware_1.CheckGuess).forRoutes('posts', 'blogs', 'comments'),
            consumer.apply(check_refreshToken_middleware_1.CheckRefreshToken).forRoutes('auth/logout', 'auth/refresh-token', 'security'),
            consumer.apply(rateLimiting_middleware_1.RateLimiting).forRoutes('auth/registration-confirmation', 'auth/registration-email-resending', 'auth/login', 'auth/registration');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: "10s" }
            }),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/nest'),
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: "ep-wandering-firefly-a2ymf77e.eu-central-1.aws.neon.tech",
                port: 5432,
                ssl: true,
                username: "egorlesnicij86",
                password: "VBqk7GPv8LIh",
                database: "neondb"
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema },
                { name: post_schema_1.Post.name, schema: post_schema_1.PostSchema },
                { name: comment_schema_1.Comments.name, schema: comment_schema_1.CommentsSchema },
                { name: like_schema_1.LikesPost.name, schema: like_schema_1.LikePostSchema },
                { name: token_schema_1.Tokens.name, schema: token_schema_1.TokenSchema },
                { name: securityDevices_schema_1.SecurityDevices.name, schema: securityDevices_schema_1.SecurityDevicesSchema },
                { name: requestUserInfo_schema_1.UserRequestInfo.name, schema: requestUserInfo_schema_1.UserRequestInfoSchema }
            ]),
            superUsers_module_1.SuperUsersModule,
        ],
        controllers: [app_controller_1.AppController, testing_controller_1.TestingController, blogs_controller_1.BlogController, post_controller_1.PostController, user_controller_1.UserController, auth_controller_1.AuthController, comments_controller_1.CommentController, securityDevices_controller_1.SecurityDevicesController],
        providers: [app_service_1.AppService, testing_service_1.TestingService, blog_service_1.BlogService, blogs_repository_1.BlogRepository, post_repository_1.PostRepository, post_service_1.PostService, user_service_1.UserService, user_repository_1.UserRepository, auth_service_1.AuthService, local_srategy_1.LocalStrategy, auth_basic_strategy_1.BasicStrategy, jwt_strategy_1.JwtStrategy, comments_service_1.CommentService, comments_repository_1.CommentsRepository, postLike_repository_1.PostLikeRepository, postLike_service_1.PostLikeService, post_validate_1.PostValidator, token_service_1.TokenService, token_repository_1.TokenRepository, securityDevices_repository_1.SecurityDevicesRepository, securityDevices_service_1.SecurityDevicesService, requestUserInfo_repository_1.RequestUserInfoRepository, requestUserInfoService_1.RequestUserInfoService, userSql_repository_1.UserSqlRepository, dataConfirmation_repository_1.DataConfirmationRepository, tokenSql_repository_1.TokenSqlRepository, securityDevicesSql_repository_1.SecurityDevicesSqlRepository],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map