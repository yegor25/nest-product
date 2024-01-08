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
let LikesPost = class LikesPost {
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
//# sourceMappingURL=like.schema.js.map