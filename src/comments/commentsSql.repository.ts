import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { CommentSqlDbType, CommentSqlQueryDbType } from "./comment.schema";
import { LikeStatus } from "../postLikes/like.schema";

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
    console.log("mod", modified)
    if (modified[1] === 1) return true;
    return false;
  }
}
