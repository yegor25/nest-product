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
const userSql_repository_1 = require("./users/userSql.repository");
const dataConfirmation_repository_1 = require("./users/dataConfirmation.repository");
const tokenSql_repository_1 = require("./tokens/tokenSql.repository");
const securityDevicesSql_repository_1 = require("./securityDevices/securityDevicesSql.repository");
const post_sqlRepository_1 = require("./posts/post.sqlRepository");
const postLike_sqlRepository_1 = require("./postLikes/postLike.sqlRepository");
const sa_blogs_controller_1 = require("./sa-blogs/sa.blogs.controller");
const sa_blogs_repository_1 = require("./sa-blogs/sa.blogs.repository");
const sa_blogs_service_1 = require("./sa-blogs/sa.blogs.service");
const superUsers_controller_1 = require("./super-users/superUsers.controller");
const superUsers_repositoru_1 = require("./super-users/superUsers.repositoru");
const superUsers_service_1 = require("./super-users/superUsers.service");
const su_validate_email_1 = require("./super-users/validators/su.validate-email");
const su_validate_login_1 = require("./super-users/validators/su.validate-login");
const commentsSql_repository_1 = require("./comments/commentsSql.repository");
const user_entity_1 = require("./users/entities/user.entity");
const confirmationData_1 = require("./users/entities/confirmationData");
const securityDevices_entity_1 = require("./securityDevices/securityDevices.entity");
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
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: "ep-wandering-firefly-a2ymf77e.eu-central-1.aws.neon.tech",
                port: 5432,
                ssl: true,
                username: "egorlesnicij86",
                password: "VBqk7GPv8LIh",
                synchronize: true,
                autoLoadEntities: true,
                database: "neondb",
                entities: [user_entity_1.Users, confirmationData_1.ConfirmationData, securityDevices_entity_1.SecurityDevices]
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, confirmationData_1.ConfirmationData, securityDevices_entity_1.SecurityDevices]),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://lesnichij94:admin2411@cluster0.9f1tjb3.mongodb.net/nest?retryWrites=true&w=majority'),
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
        ],
        controllers: [app_controller_1.AppController, testing_controller_1.TestingController, user_controller_1.UserController, blogs_controller_1.BlogController, post_controller_1.PostController, comments_controller_1.CommentController, sa_blogs_controller_1.SuperAdminBlogsController, securityDevices_controller_1.SecurityDevicesController, superUsers_controller_1.SuperUserController, user_controller_1.UserController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, testing_service_1.TestingService, local_srategy_1.LocalStrategy, auth_basic_strategy_1.BasicStrategy, jwt_strategy_1.JwtStrategy, post_validate_1.PostValidator, blogs_repository_1.BlogRepository, blog_service_1.BlogService, post_service_1.PostService, post_service_1.PostService, post_sqlRepository_1.PostSqlRepository, post_repository_1.PostRepository, blog_service_1.BlogService, postLike_service_1.PostLikeService, comments_repository_1.CommentsRepository, comments_service_1.CommentService, postLike_repository_1.PostLikeRepository, postLike_service_1.PostLikeService, postLike_sqlRepository_1.PostLikeSqlRepository, requestUserInfoService_1.RequestUserInfoService, requestUserInfo_repository_1.RequestUserInfoRepository, sa_blogs_service_1.SuperAdminBlogService, sa_blogs_repository_1.SuperAdminBlogsRepository, securityDevices_repository_1.SecurityDevicesRepository, securityDevices_service_1.SecurityDevicesService, securityDevicesSql_repository_1.SecurityDevicesSqlRepository, superUsers_service_1.SuperUsersService, superUsers_repositoru_1.SuperUserRepository, su_validate_email_1.SuValidatorEmail, su_validate_login_1.SuValidatorLogin, token_service_1.TokenService, tokenSql_repository_1.TokenSqlRepository, token_repository_1.TokenRepository, user_service_1.UserService, user_repository_1.UserRepository, userSql_repository_1.UserSqlRepository, dataConfirmation_repository_1.DataConfirmationRepository, auth_service_1.AuthService, commentsSql_repository_1.CommentsSqlRepository],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map