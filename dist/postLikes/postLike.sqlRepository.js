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
const postLike_entity_1 = require("./postLike.entity");
let PostLikeSqlRepository = class PostLikeSqlRepository {
    constructor(dataSource, plRepo) {
        this.dataSource = dataSource;
        this.plRepo = plRepo;
    }
    async create(userId, postId, likeStatus, login) {
        return this.plRepo
            .createQueryBuilder()
            .insert()
            .values({
            userId,
            postId,
            login,
            status: likeStatus,
            addedAt: new Date().toISOString(),
        })
            .execute();
    }
    async getByPostId(postId) {
        return this.plRepo
            .createQueryBuilder()
            .select()
            .where("postId = :postId", { postId })
            .getOne();
    }
    async checkReaction(userId, postId) {
        const reaction = await this.plRepo
            .createQueryBuilder("p")
            .select()
            .where("p.postId = :postId AND p.userId = :userId", { postId, userId })
            .getOne();
        if (reaction)
            return true;
        return false;
    }
    async changeExistReaction(userId, postId, likeStatus) {
        const newReaction = await this.plRepo.createQueryBuilder()
            .update(postLike_entity_1.PostLikes)
            .set({ status: likeStatus, addedAt: new Date().toISOString() })
            .where("postId = :postId AND userId = :userId", { postId, userId })
            .execute();
        console.log("newwe", newReaction);
        return newReaction;
    }
};
exports.PostLikeSqlRepository = PostLikeSqlRepository;
exports.PostLikeSqlRepository = PostLikeSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(postLike_entity_1.PostLikes)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], PostLikeSqlRepository);
//# sourceMappingURL=postLike.sqlRepository.js.map