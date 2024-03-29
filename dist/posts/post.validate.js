"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidator = void 0;
const class_validator_1 = require("class-validator");
const blog_service_1 = require("../blogs/blog.service");
const sa_blogs_service_1 = require("../sa-blogs/sa.blogs.service");
let PostValidator = class PostValidator {
    constructor(blogService, saBlogService) {
        this.blogService = blogService;
        this.saBlogService = saBlogService;
    }
    async validate(value) {
        if (!value)
            return false;
        const blog = await this.saBlogService.findById(value);
        return !!blog;
    }
    defaultMessage(validationArguments) {
        return "invalid blogId";
    }
};
exports.PostValidator = PostValidator;
exports.PostValidator = PostValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "postValidator", async: true }),
    __metadata("design:paramtypes", [blog_service_1.BlogService,
        sa_blogs_service_1.SuperAdminBlogService])
], PostValidator);
//# sourceMappingURL=post.validate.js.map