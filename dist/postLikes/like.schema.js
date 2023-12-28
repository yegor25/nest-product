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
exports.LikePostSchema = exports.LikesPost = exports.LikeStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var LikeStatus;
(function (LikeStatus) {
    LikeStatus["None"] = "None";
    LikeStatus["Like"] = "Like";
    LikeStatus["Dislike"] = "Dislike";
})(LikeStatus || (exports.LikeStatus = LikeStatus = {}));
let LikesPost = class LikesPost extends Document {
    getNewstLikes(userId, reactions) {
        let likeCount = 0;
        let disLikeCount = 0;
        let userStatus = LikeStatus.None;
        reactions.forEach(el => {
            if (el.status === LikeStatus.Like)
                likeCount += 1;
            if (el.status === LikeStatus.Dislike)
                disLikeCount += 1;
            if (userId && el.userId === userId)
                userStatus = el.status;
        });
        const likes = reactions.filter(el => el.status === LikeStatus.Like).sort((a, b) => new Date(a.addedAt) < new Date(b.addedAt) ? 1 : -1);
        const newest = likes.splice(0, 3).map(el => ({ addedAt: el.addedAt.toISOString(), userId: el.userId, login: el.login }));
        const result = {
            likesCount: likeCount,
            dislikesCount: disLikeCount,
            myStatus: userStatus,
            newestLikes: newest
        };
        return result;
    }
};
exports.LikesPost = LikesPost;
__decorate([
    (0, mongoose_1.Prop)({
        default: new Date()
    }),
    __metadata("design:type", Date)
], LikesPost.prototype, "addedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikesPost.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikesPost.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikesPost.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikesPost.prototype, "postId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], LikesPost.prototype, "isFirst", void 0);
exports.LikesPost = LikesPost = __decorate([
    (0, mongoose_1.Schema)()
], LikesPost);
exports.LikePostSchema = mongoose_1.SchemaFactory.createForClass(LikesPost);
exports.LikePostSchema.methods = {
    getNewestLikes: LikesPost.prototype.getNewstLikes
};
//# sourceMappingURL=like.schema.js.map