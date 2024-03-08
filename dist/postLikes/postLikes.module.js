"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikesModule = void 0;
const common_1 = require("@nestjs/common");
const postLike_repository_1 = require("./postLike.repository");
const postLike_service_1 = require("./postLike.service");
const postLike_sqlRepository_1 = require("./postLike.sqlRepository");
const post_service_1 = require("../posts/post.service");
const mongoose_1 = require("@nestjs/mongoose");
const like_schema_1 = require("./like.schema");
let PostLikesModule = class PostLikesModule {
};
exports.PostLikesModule = PostLikesModule;
exports.PostLikesModule = PostLikesModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [postLike_repository_1.PostLikeRepository, postLike_service_1.PostLikeService, postLike_sqlRepository_1.PostLikeSqlRepository, post_service_1.PostService],
        exports: [postLike_service_1.PostLikeService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: like_schema_1.LikesPost.name, schema: like_schema_1.LikePostSchema }
            ])
        ]
    })
], PostLikesModule);
//# sourceMappingURL=postLikes.module.js.map