"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const post_sqlRepository_1 = require("./post.sqlRepository");
const post_repository_1 = require("./post.repository");
const blog_service_1 = require("../blogs/blog.service");
const postLike_service_1 = require("../postLikes/postLike.service");
const sa_blogs_service_1 = require("../sa-blogs/sa.blogs.service");
const mongoose_1 = require("@nestjs/mongoose");
const post_schema_1 = require("./post.schema");
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = __decorate([
    (0, common_1.Module)({
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService, post_sqlRepository_1.PostSqlRepository, post_repository_1.PostRepository, blog_service_1.BlogService, postLike_service_1.PostLikeService, sa_blogs_service_1.SuperAdminBlogService],
        exports: [post_service_1.PostService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: post_schema_1.Post.name, schema: post_schema_1.PostSchema }
            ]),
        ]
    })
], PostsModule);
//# sourceMappingURL=post.module.js.map