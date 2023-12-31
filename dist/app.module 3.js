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
const user_controller_1 = require("./users/user.controller");
const user_repository_1 = require("./users/user.repository");
const user_service_1 = require("./users/user.service");
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
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://lesnichij94:admin2411@cluster0.9f1tjb3.mongodb.net/nest?retryWrites=true&w=majority'),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema },
                { name: post_schema_1.Post.name, schema: post_schema_1.PostSchema },
            ]),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, testing_controller_1.TestingController, blogs_controller_1.BlogController, post_controller_1.PostController],
        providers: [app_service_1.AppService, user_repository_1.UserRepository, user_service_1.UserService, testing_service_1.TestingService, blog_service_1.BlogService, blogs_repository_1.BlogRepository, post_repository_1.PostRepository, post_service_1.PostService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map