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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikeSqlRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PostLikeSqlRepository = class PostLikeSqlRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async create(userId, postId, likeStatus, login) {
        const newReaction = await this.dataSource.query(`
            insert into public."PostLikes"
            ("userId","postId","login","status","addedAt")
            values($1,$2,$3,$4,'${new Date().toISOString()}');
        `, [userId, postId, login, likeStatus]);
        return;
    }
    async getByPostId(postId) {
        return this.dataSource.query(`
        select * from public."PostLikes" p
        where p."postId" = $1;
    `, [postId]);
    }
    async checkReaction(userId, postId) {
        const reaction = await this.dataSource.query(`
        select * from public."PostLikes" p 
        where p."userId" = $1 AND p."postId" = $2;
    `, [userId, postId]);
        if (reaction[0])
            return true;
        return false;
    }
    async changeExistReaction(userId, postId, likeStatus) {
        return this.dataSource.query(`
        update public."PostLikes" p
        set "status" = $1, "addedAt" = '${new Date().toISOString()}'
        where p."postId" = $2 AND p."userId" = $3;
    `, [likeStatus, postId, userId]);
    }
};
exports.PostLikeSqlRepository = PostLikeSqlRepository;
exports.PostLikeSqlRepository = PostLikeSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], PostLikeSqlRepository);
//# sourceMappingURL=postLike.sqlRepository.js.map