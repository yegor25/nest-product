"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminBlogsModule = void 0;
const common_1 = require("@nestjs/common");
const sa_blogs_controller_1 = require("./sa.blogs.controller");
const sa_blogs_service_1 = require("./sa.blogs.service");
const sa_blogs_repository_1 = require("./sa.blogs.repository");
let SuperAdminBlogsModule = class SuperAdminBlogsModule {
};
exports.SuperAdminBlogsModule = SuperAdminBlogsModule;
exports.SuperAdminBlogsModule = SuperAdminBlogsModule = __decorate([
    (0, common_1.Module)({
        controllers: [sa_blogs_controller_1.SuperAdminBlogsController],
        providers: [sa_blogs_service_1.SuperAdminBlogService, sa_blogs_repository_1.SuperAdminBlogsRepository],
        exports: []
    })
], SuperAdminBlogsModule);
//# sourceMappingURL=sa.blogs.module.js.map