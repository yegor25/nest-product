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
exports.PostSchema = exports.postDtoTypeForBlog = exports.createdPosForBlogtDtoType = exports.createdPostDtoType = exports.Post = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const like_schema_1 = require("../postLikes/like.schema");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const post_validate_1 = require("./post.validate");
let Post = class Post {
    getDefaultLikes() {
        return {
            likesCount: 0,
            dislikesCount: 0,
            myStatus: like_schema_1.LikeStatus.None,
            newestLikes: []
        };
    }
};
exports.Post = Post;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "shortDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "blogId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "blogName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: new Date().toISOString()
    }),
    __metadata("design:type", String)
], Post.prototype, "createdAt", void 0);
exports.Post = Post = __decorate([
    (0, mongoose_1.Schema)()
], Post);
class createdPostDtoType {
}
exports.createdPostDtoType = createdPostDtoType;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], createdPostDtoType.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], createdPostDtoType.prototype, "shortDescription", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], createdPostDtoType.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(post_validate_1.PostValidator),
    __metadata("design:type", String)
], createdPostDtoType.prototype, "blogId", void 0);
class createdPosForBlogtDtoType {
}
exports.createdPosForBlogtDtoType = createdPosForBlogtDtoType;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], createdPosForBlogtDtoType.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], createdPosForBlogtDtoType.prototype, "shortDescription", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], createdPosForBlogtDtoType.prototype, "content", void 0);
class postDtoTypeForBlog {
}
exports.postDtoTypeForBlog = postDtoTypeForBlog;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], postDtoTypeForBlog.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], postDtoTypeForBlog.prototype, "shortDescription", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], postDtoTypeForBlog.prototype, "content", void 0);
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
exports.PostSchema.methods = {
    getDefaultLikes: Post.prototype.getDefaultLikes
};
//# sourceMappingURL=post.schema.js.map