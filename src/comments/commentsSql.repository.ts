import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
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

@Injectable()
export class CommentsSqlRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

  async createComment(postId: string, content: string, userId: string) {
    const comment = await this.dataSource.query<CommentSqlDbType[]>(
      `
            insert into public."Comments"
            ("content","createdAt","userId","postId")
            values($1,'${new Date().toISOString()}',$2,$3)
            returning *
            ;
        `,
      [content, userId, postId]
    );
    console.log("comment", comment);
    return comment[0];
  }
  async findById(
    commentId: string,
    userId?: string
  ): Promise<CommentSqlQueryDbType | null> {
    const comment = await this.dataSource.query<CommentSqlQueryDbType[]>(
      `
            select c."id",c."content",c."createdAt", u."login" as "userLogin", u."id" as "userId",
            (
                select count(*) as "likesCount"
                from public."CommentsLikes" cl
                where cl."commentId" = $1 and cl."status" = '${LikeStatus.Like}'
            ),
            (
                select count(*) as "dislikesCount"
                from public."CommentsLikes" cl
                where cl."commentId" = $1 and cl."status" = '${LikeStatus.Dislike}'
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
        `,
      [commentId, userId]
    );
    if (!comment[0]) return null;
    return comment[0];
  }
  async deleteById(id: string, userId: string): Promise<boolean> {
    const deleted = await this.dataSource.query(
      `
            delete from public."Comments" c
            where c."id" = $1 and c."userId" = $2
            ;
        `,
      [id, userId]
    );
    if (deleted[1] === 1) return true;
    return false;
  }
  async updateComment(
    id: string,
    userId: string,
    content: string
  ): Promise<boolean> {
    const modified = await this.dataSource.query(
      `
                update public."Comments" c
                set "content" = $1
                where c."id" = $2 and c."userId" = $3;

            `,
      [content, id, userId]
    );
    console.log("mod", modified);
    if (modified[1] === 1) return true;
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
      ? params.sortDirection
      : SortDirection.desc;
    const comments = await this.dataSource.query<CommentSqlQueryDbType[]>(
      `
              select c."id",c."content",c."createdAt", u."login" as "userLogin", u."id" as "userId",
              (
                  select count(*) as "likesCount"
                  from public."CommentsLikes" cl
                  where cl."commentId" = $1 and cl."status" = '${LikeStatus.Like}'
              ),
              (
                  select count(*) as "dislikesCount"
                  from public."CommentsLikes" cl
                  where cl."commentId" = $1 and cl."status" = '${LikeStatus.Dislike}'
              ),
              (
                  select cl."status" 
                  from public."CommentsLikes" cl
                  where cl."commentId" = $1 and cl."userId"::text = $2
                 ) as "myStatus"
              from public."Comments" c
              left join public."Users" u
              on u."id" = c."userId"
              where c."postId" = $1
              order by c."${parametres.sortBy}" ${sortDirection}
              limit ${+parametres.pageSize} offset ${skipCount}
              ;
          `,
      [postId, userId]
    );
    const totalCount = await this.dataSource.query<{ count: string }[]>(
      `
                select count(*)
                from public."Comments" c
                where c."postId" = $1
      `,
      [postId]
    );

    return {
      pagesCount: Math.ceil(+totalCount[0].count / +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: parametres.pageSize,
      totalCount: +totalCount[0].count,
      items: comments
    };
  }
  async changeExistLikeStatus(likesStatus: LikeStatus, userId: string, commentId: string):Promise<boolean>{
    const modified = await this.dataSource.query(`
      update public."CommentsLikes" c
      set "status" = $1
      where c."userId" = $2 and c."commentId" = $2;
    `,[likesStatus,userId, commentId])
    if (modified[1] === 1) return true;
    return false;
  }
  async checkExistReaction(userId: string, commentId: string):Promise<boolean>{
    const reaction = await this.dataSource.query<commentLikeSqlDbType[]>(`
        select * from public."CommentsLikes" c
        where c."userId" = $1 and c."commentId" = $2;
    `,[userId, commentId])
    if(reaction[0]) return true
    return false

  }
  async changeLikeStatus(userId: string, commentId: string,status: LikeStatus){
    return this.dataSource.query(`
        insert into public."CommentsLikes"
        ("commentId","createdAt", "status","userId")
        values($1,'${new Date().toISOString()}',$2,$3);
    `,[commentId,status, userId])
  }
}
