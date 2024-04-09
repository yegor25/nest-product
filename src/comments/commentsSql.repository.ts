import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import {
  CommentSqlDbType,
  CommentSqlQueryDbType,
  commentLikeSqlDbType,
  paramsCommentsPaginatorType,
  viewAllComentsSqlType,
  viewAllCommentsType,
} from "./comment.schema";
import { LikeStatus } from "../postLikes/like.schema";
import { commentHelper } from "./comment.helper";
import { SortDirection } from "../users/user.schema";
import { Comments } from "./comment.entity";
import { CommentLikes } from "../commentsLikes/commentLike.entity";

@Injectable()
export class CommentsSqlRepository {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    @InjectRepository(Comments) protected commentRepo: Repository<Comments>,
    @InjectRepository(CommentLikes) protected clRepo: Repository<CommentLikes>
  ) {}

  async createComment(postId: string, content: string, userId: string) {
    // const comment = await this.dataSource.query<CommentSqlDbType[]>(
    //   `
    //         insert into public."Comments"
    //         ("content","createdAt","userId","postId")
    //         values($1,'${new Date().toISOString()}',$2,$3)
    //         returning *
    //         ;
    //     `,
    //   [content, userId, postId]
    // );
    // console.log("comment", comment);
    // return comment[0];
    const comment = await this.commentRepo
      .createQueryBuilder()
      .insert()
      .values({ postId, content, userId, createdAt: new Date().toISOString() })
      .returning("*")
      .execute();

    return comment.raw[0];
  }
  async findById(
    commentId: string,
    userId?: string
  ): Promise<CommentSqlQueryDbType | null> {
    // const comment = await this.dataSource.query<CommentSqlQueryDbType[]>(
    //   `
    //         select c."id",c."content",c."createdAt", u."login" as "userLogin", u."id" as "userId",
    //         (
    //             select count(*) as "likesCount"
    //             from public."CommentsLikes" cl
    //             where cl."commentId" = $1 and cl."status" = '${LikeStatus.Like}'
    //         ),
    //         (
    //             select count(*) as "dislikesCount"
    //             from public."CommentsLikes" cl
    //             where cl."commentId" = $1 and cl."status" = '${LikeStatus.Dislike}'
    //         ),
    //         (
    //             select cl."status"
    //             from public."CommentsLikes" cl
    //             where cl."commentId" = $1 and cl."userId"::text = $2
    //            ) as "myStatus"
    //         from public."Comments" c
    //         left join public."Users" u
    //         on u."id" = c."userId"
    //         where c."id" = $1
    //         ;
    //     `,
    //   [commentId, userId]
    // );

    const comment: CommentSqlQueryDbType | undefined = await this.commentRepo
      .createQueryBuilder("c")
      .leftJoinAndSelect("c.user", "users")
      .select([
        "c.id as id",
        "c.content as content",
        `c.createdAt as "createdAt"`,
        `users.login as "userLogin"`,
        `users.id as "userId"`,
      ])
      .addSelect(
        `(select count(*) as "likesCount"
                from public."comment_likes" cl
                where cl."commentId" = '${commentId}' and cl."status" = '${LikeStatus.Like}'
                )`
      )
      .addSelect(
        `
        (
          select count(*) as "dislikesCount"
          from public."comment_likes" cl
          where cl."commentId" = '${commentId}' and cl."status" = '${LikeStatus.Dislike}'
        )
      `
      )
      .addSelect(
        `
        (
        select cl."status" as "myStatus"
        from public."comment_likes" cl
        where cl."commentId" = '${commentId}' 
        and cl."userId"::text = '${userId}'
        )
      `
      )
      .where("c.id = :id", { id: commentId })
      .getRawOne();
    console.log("com", comment);
    if (!comment) return null;
    return comment;
  }
  async deleteById(id: string, userId: string): Promise<boolean> {
    // const deleted = await this.dataSource.query(
    //   `
    //         delete from public."Comments" c
    //         where c."id" = $1 and c."userId" = $2
    //         ;
    //     `,
    //   [id, userId]
    // );
    const deleted = await this.commentRepo
      .createQueryBuilder()
      .delete()
      .from(Comments)
      .where("id = :id AND userId = :userId", { id, userId })
      .execute();
    if (deleted.affected === 1) return true;
    return false;
  }
  async updateComment(
    id: string,
    userId: string,
    content: string
  ): Promise<boolean> {
    // const modified = await this.dataSource.query(
    //   `
    //             update public."Comments" c
    //             set "content" = $1
    //             where c."id" = $2 and c."userId" = $3;

    //         `,
    //   [content, id, userId]
    // );
    const modified = await this.commentRepo
      .createQueryBuilder()
      .update(Comments)
      .set({ content })
      .where("id = :id AND userId = :userId", { id, userId })
      .execute();
    console.log("mod", modified);
    if (modified.affected === 1) return true;
    return false;
  }
  async findCommentsByPostId(
    postId: string,
    params: paramsCommentsPaginatorType,
    userId?: string
  ): Promise<viewAllComentsSqlType> {
    const parametres = commentHelper.commentsParamsMapper(params);
    const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
    const sortDirection = params.sortDirection
      ? params.sortDirection.toUpperCase()
      : SortDirection.desc;
    // const comments = await this.dataSource.query<CommentSqlQueryDbType[]>(
    //   `
    //           select c."id",c."content",c."createdAt", u."login" as "userLogin", u."id" as "userId",
    //           (
    //               select count(*) as "likesCount"
    //               from public."CommentsLikes" cl
    //               where cl."commentId" = c."id" and cl."status" = '${LikeStatus.Like}'
    //           ),
    //           (
    //               select count(*) as "dislikesCount"
    //               from public."CommentsLikes" cl
    //               where cl."commentId" = c."id" and cl."status" = '${LikeStatus.Dislike}'
    //           ),
    //           (
    //               select cl."status"
    //               from public."CommentsLikes" cl
    //               where cl."commentId" = c."id" and cl."userId"::text = $2
    //              ) as "myStatus"
    //           from public."Comments" c
    //           left join public."Users" u
    //           on u."id" = c."userId"
    //           where c."postId" = $1
    //           order by c."${parametres.sortBy}" ${sortDirection}
    //           limit ${+parametres.pageSize} offset ${skipCount}
    //           ;
    //       `,
    //   [postId, userId]
    // );
    // const totalCount = await this.dataSource.query<{ count: string }[]>(
    //   `
    //             select count(*)
    //             from public."Comments" c
    //             where c."postId" = $1
    //   `,
    //   [postId]
    // );

    const comments = await this.commentRepo.createQueryBuilder("c")
    .leftJoinAndSelect("c.user", "users")
    .select([
      "c.id as id",
      "c.content as content",
      `c.createdAt as "createdAt"`,
      `users.login as "userLogin"`,
      `users.id as "userId"`,
    ])
    .addSelect(
      `(select count(*) as "likesCount"
              from public."comment_likes" cl
              where cl."commentId" = c."id" and cl."status" = '${LikeStatus.Like}'
              )`
    )
    .addSelect(
      `
      (
        select count(*) as "dislikesCount"
        from public."comment_likes" cl
        where cl."commentId" = c."id" and cl."status" = '${LikeStatus.Dislike}'
      )
    `
    )
    .addSelect(
      `
      (
      select cl."status" as "myStatus"
      from public."comment_likes" cl
      where cl."commentId" = c."id" 
      and cl."userId"::text = '${userId}'
      )
    `
    )
    .where("c.postId = :postId",{postId})
    .orderBy(`c.${parametres.sortBy}`, `${sortDirection as SortDirection}`)
    .take(+parametres.pageSize)
    .skip(skipCount)
    .getRawMany()
    
    const totalCount = await this.commentRepo
      .createQueryBuilder("c")
      .where("c.postId = :postId", { postId })
      .getCount();
      console.log("commentss", comments)
    return {
      pagesCount: Math.ceil(totalCount / +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: parametres.pageSize,
      totalCount: totalCount,
      items: comments,
    };
  }
  async changeExistLikeStatus(
    likesStatus: LikeStatus,
    userId: string,
    commentId: string
  ): Promise<boolean> {
    // const modified = await this.dataSource.query(
    //   `
    //   update public."CommentsLikes" c
    //   set "status" = $1
    //   where c."userId" = $2 and c."commentId" = $3;
    // `,
    //   [likesStatus, userId, commentId]
    // );
    const modified = await this.clRepo
      .createQueryBuilder()
      .update(CommentLikes)
      .set({ status: likesStatus })
      .where("userId = :userId AND commentId = :commentId", {
        userId,
        commentId,
      })
      .execute();
    if (modified.affected === 1) return true;
    return false;
  }
  async checkExistReaction(
    userId: string,
    commentId: string
  ): Promise<boolean> {
    // const reaction = await this.dataSource.query<commentLikeSqlDbType[]>(
    //   `
    //     select * from public."CommentsLikes" c
    //     where c."userId" = $1 and c."commentId" = $2;
    // `,
    //   [userId, commentId]
    // );
    const reaction = await this.clRepo
      .createQueryBuilder()
      .select()
      .where("userId = :userId AND commentId = :commentId", {
        userId,
        commentId,
      })
      .getOne();
    if (reaction) return true;
    return false;
  }
  async changeLikeStatus(
    userId: string,
    commentId: string,
    status: LikeStatus
  ) {
    // return this.dataSource.query(
    //   `
    //     insert into public."CommentsLikes"
    //     ("commentId","createdAt", "status","userId")
    //     values($1,'${new Date().toISOString()}',$2,$3);
    // `,
    //   [commentId, status, userId]
    // );
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
}
