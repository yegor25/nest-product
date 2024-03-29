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
let CommentsSqlRepository = class CommentsSqlRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createComment(postId, content, userId) {
        const comment = await this.dataSource.query(`
            insert into public."Comments"
            ("content","createdAt","userId","postId")
            values($1,'${new Date().toISOString()}',$2,$3)
            returning *
            ;
        `, [content, userId, postId]);
        console.log("comment", comment);
        return comment[0];
    }
    async findById(commentId, userId) {
        const comment = await this.dataSource.query(`
            select c."id",c."content",c."createdAt", u."login" as "userLogin", u."id" as "userId",
            (
                select count(*) as "likesCount"
                from public."CommentsLikes" cl
                where cl."commentId" = $1 and cl."status" = '${like_schema_1.LikeStatus.Like}'
            ),
            (
                select count(*) as "dislikesCount"
                from public."CommentsLikes" cl
                where cl."commentId" = $1 and cl."status" = '${like_schema_1.LikeStatus.Dislike}'
            ),
            (
                select cl."status" 
                from public."CommentsLikes" cl
                where cl."commentId" = $1 and cl."userId"::text = $2
               ) as "myStatus"
            from public."Comments" c
            left join public."Users" u
            on u."id" = c."userId"
            where c."id" = $1
            ;
        `, [commentId, userId]);
        if (!comment[0])
            return null;
        return comment[0];
    }
    async deleteById(id, userId) {
        const deleted = await this.dataSource.query(`
            delete from public."Comments" c
            where c."id" = $1 and c."userId" = $2
            ;
        `, [id, userId]);
        if (deleted[1] === 1)
            return true;
        return false;
    }
    async updateComment(id, userId, content) {
        const modified = await this.dataSource.query(`
                update public."Comments" c
                set "content" = $1
                where c."id" = $2 and c."userId" = $3;

            `, [content, id, userId]);
        console.log("mod", modified);
        if (modified[1] === 1)
            return true;
        return false;
    }
    async findCommentsByPostId(postId, params, userId) {
        const parametres = comment_helper_1.commentHelper.commentsParamsMapper(params);
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
        const sortDirection = params.sortDirection
            ? params.sortDirection
            : user_schema_1.SortDirection.desc;
        const comments = await this.dataSource.query(`
              select c."id",c."content",c."createdAt", u."login" as "userLogin", u."id" as "userId",
              (
                  select count(*) as "likesCount"
                  from public."CommentsLikes" cl
                  where cl."commentId" = c."id" and cl."status" = '${like_schema_1.LikeStatus.Like}'
              ),
              (
                  select count(*) as "dislikesCount"
                  from public."CommentsLikes" cl
                  where cl."commentId" = c."id" and cl."status" = '${like_schema_1.LikeStatus.Dislike}'
              ),
              (
                  select cl."status" 
                  from public."CommentsLikes" cl
                  where cl."commentId" = c."id" and cl."userId"::text = $2
                 ) as "myStatus"
              from public."Comments" c
              left join public."Users" u
              on u."id" = c."userId"
              where c."postId" = $1
              order by c."${parametres.sortBy}" ${sortDirection}
              limit ${+parametres.pageSize} offset ${skipCount}
              ;
          `, [postId, userId]);
        const totalCount = await this.dataSource.query(`
                select count(*)
                from public."Comments" c
                where c."postId" = $1
      `, [postId]);
        return {
            pagesCount: Math.ceil(+totalCount[0].count / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: parametres.pageSize,
            totalCount: +totalCount[0].count,
            items: comments
        };
    }
    async changeExistLikeStatus(likesStatus, userId, commentId) {
        const modified = await this.dataSource.query(`
      update public."CommentsLikes" c
      set "status" = $1
      where c."userId" = $2 and c."commentId" = $3;
    `, [likesStatus, userId, commentId]);
        if (modified[1] === 1)
            return true;
        return false;
    }
    async checkExistReaction(userId, commentId) {
        const reaction = await this.dataSource.query(`
        select * from public."CommentsLikes" c
        where c."userId" = $1 and c."commentId" = $2;
    `, [userId, commentId]);
        if (reaction[0])
            return true;
        return false;
    }
    async changeLikeStatus(userId, commentId, status) {
        return this.dataSource.query(`
        insert into public."CommentsLikes"
        ("commentId","createdAt", "status","userId")
        values($1,'${new Date().toISOString()}',$2,$3);
    `, [commentId, status, userId]);
    }
};
exports.CommentsSqlRepository = CommentsSqlRepository;
exports.CommentsSqlRepository = CommentsSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], CommentsSqlRepository);
//# sourceMappingURL=commentsSql.repository.js.map