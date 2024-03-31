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
exports.BlogSchema = exports.SortDirection = exports.createdDtoBlogType = exports.Blog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let Blog = class Blog {
};
exports.Blog = Blog;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Blog.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Blog.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: new Date().toISOString(),
    }),
    __metadata("design:type", String)
], Blog.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Blog.prototype, "websiteUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false
    }),
    __metadata("design:type", Boolean)
], Blog.prototype, "isMembership", void 0);
exports.Blog = Blog = __decorate([
    (0, mongoose_1.Schema)()
], Blog);
class createdDtoBlogType {
}
exports.createdDtoBlogType = createdDtoBlogType;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value.trim())),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], createdDtoBlogType.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value.trim())),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], createdDtoBlogType.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value.trim())),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], createdDtoBlogType.prototype, "websiteUrl", void 0);
var SortDirection;
(function (SortDirection) {
    SortDirection["asc"] = "ASC";
    SortDirection["desc"] = "DESC";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
exports.BlogSchema = mongoose_1.SchemaFactory.createForClass(Blog);
//# sourceMappingURL=blog.schema.js.map