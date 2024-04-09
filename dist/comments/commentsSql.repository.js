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
exports.CommentsSqlRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const like_schema_1 = require("../postLikes/like.schema");
const comment_helper_1 = require("./comment.helper");
const user_schema_1 = require("../users/user.schema");
const comment_entity_1 = require("./comment.entity");
const commentLike_entity_1 = require("../commentsLikes/commentLike.entity");
let CommentsSqlRepository = class CommentsSqlRepository {
    constructor(dataSource, commentRepo, clRepo) {
        this.dataSource = dataSource;
        this.commentRepo = commentRepo;
        this.clRepo = clRepo;
    }
    async createComment(postId, content, userId) {
        const comment = await this.commentRepo
            .createQueryBuilder()
            .insert()
            .values({ postId, content, userId, createdAt: new Date().toISOString() })
            .returning("*")
            .execute();
        return comment.raw[0];
    }
    async findById(commentId, userId) {
        const comment = await this.commentRepo
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.user", "users")
            .select([
            "c.id as id",
            "c.content as content",
            `c.createdAt as "createdAt"`,
            `users.login as "userLogin"`,
            `users.id as "userId"`,
        ])
            .addSelect(`(select count(*) as "likesCount"
                from public."comment_likes" cl
                where cl."commentId" = '${commentId}' and cl."status" = '${like_schema_1.LikeStatus.Like}'
                )`)
            .addSelect(`
        (
          select count(*) as "dislikesCount"
          from public."comment_likes" cl
          where cl."commentId" = '${commentId}' and cl."status" = '${like_schema_1.LikeStatus.Dislike}'
        )
      `)
            .addSelect(`
        (
        select cl."status" as "myStatus"
        from public."comment_likes" cl
        where cl."commentId" = '${commentId}' 
        and cl."userId"::text = '${userId}'
        )
      `)
            .where("c.id = :id", { id: commentId })
            .getRawOne();
        console.log("com", comment);
        if (!comment)
            return null;
        return comment;
    }
    async deleteById(id, userId) {
        const deleted = await this.commentRepo
            .createQueryBuilder()
            .delete()
            .from(comment_entity_1.Comments)
            .where("id = :id AND userId = :userId", { id, userId })
            .execute();
        if (deleted.affected === 1)
            return true;
        return false;
    }
    async updateComment(id, userId, content) {
        const modified = await this.commentRepo
            .createQueryBuilder()
            .update(comment_entity_1.Comments)
            .set({ content })
            .where("id = :id AND userId = :userId", { id, userId })
            .execute();
        console.log("mod", modified);
        if (modified.affected === 1)
            return true;
        return false;
    }
    async findCommentsByPostId(postId, params, userId) {
        const parametres = comment_helper_1.commentHelper.commentsParamsMapper(params);
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
        const sortDirection = params.sortDirection
            ? params.sortDirection.toUpperCase()
            : user_schema_1.SortDirection.desc;
        const comments = await this.commentRepo.createQueryBuilder("c")
            .leftJoinAndSelect("c.user", "users")
            .select([
            "c.id as id",
            "c.content as content",
            `c.createdAt as "createdAt"`,
            `users.login as "userLogin"`,
            `users.id as "userId"`,
        ])
            .addSelect(`(select count(*) as "likesCount"
              from public."comment_likes" cl
              where cl."commentId" = c."id" and cl."status" = '${like_schema_1.LikeStatus.Like}'
              )`)
            .addSelect(`
      (
        select count(*) as "dislikesCount"
        from public."comment_likes" cl
        where cl."commentId" = c."id" and cl."status" = '${like_schema_1.LikeStatus.Dislike}'
      )
    `)
            .addSelect(`
      (
      select cl."status" as "myStatus"
      from public."comment_likes" cl
      where cl."commentId" = c."id" 
      and cl."userId"::text = '${userId}'
      )
    `)
            .where("c.postId = :postId", { postId })
            .orderBy(`c.${parametres.sortBy}`, `${sortDirection}`)
            .offset(skipCount)
            .limit(+parametres.pageSize)
            .execute();
        const totalCount = await this.commentRepo
            .createQueryBuilder("c")
            .where("c.postId = :postId", { postId })
            .getCount();
        return {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: parametres.pageSize,
            totalCount: totalCount,
            items: comments,
        };
    }
    async changeExistLikeStatus(likesStatus, userId, commentId) {
        const modified = await this.clRepo
            .createQueryBuilder()
            .update(commentLike_entity_1.CommentLikes)
            .set({ status: likesStatus })
            .where("userId = :userId AND commentId = :commentId", {
            userId,
            commentId,
        })
            .execute();
        if (modified.affected === 1)
            return true;
        return false;
    }
    async checkExistReaction(userId, commentId) {
        const reaction = await this.clRepo
            .createQueryBuilder()
            .select()
            .where("userId = :userId AND commentId = :commentId", {
            userId,
            commentId,
        })
            .getOne();
        if (reaction)
            return true;
        return false;
    }
    async changeLikeStatus(userId, commentId, status) {
        return this.clRepo
            .createQueryBuilder()
            .insert()
            .values({
            commentId,
            userId,
            status,
            createdAt: new Date().toISOString(),
        })
            .execute();
    }
    async deleteAll() {
        return this.commentRepo.createQueryBuilder().delete().from(comment_entity_1.Comments).execute;
    }
};
exports.CommentsSqlRepository = CommentsSqlRepository;
exports.CommentsSqlRepository = CommentsSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(comment_entity_1.Comments)),
    __param(2, (0, typeorm_1.InjectRepository)(commentLike_entity_1.CommentLikes)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsSqlRepository);
//# sourceMappingURL=commentsSql.repository.js.map