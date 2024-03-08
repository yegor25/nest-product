"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const blogs_controller_1 = require("./blogs.controller");
const blogs_repository_1 = require("./blogs.repository");
const blog_service_1 = require("./blog.service");
const mongoose_1 = require("@nestjs/mongoose");
const blog_schema_1 = require("./blog.schema");
const post_service_1 = require("../posts/post.service");
let BlogsModule = class BlogsModule {
};
exports.BlogsModule = BlogsModule;
exports.BlogsModule = BlogsModule = __decorate([
    (0, common_1.Module)({
        controllers: [blogs_controller_1.BlogController],
        providers: [blogs_repository_1.BlogRepository, blog_service_1.BlogService, post_service_1.PostService],
        exports: [blog_service_1.BlogService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema }
            ])
        ]
    })
], BlogsModule);
//# sourceMappingURL=blogs.module.js.map