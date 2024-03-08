import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import {
  createdPosForBlogtDtoType,
  createdPostDtoType,
  paramsPostPaginatorType,
  postDtoResponseType,
  postSqlDbType,
  viewAllPostsType,
} from "./post.schema";
import { postHelper } from "./postHelper";
import { SortDirection } from "../users/user.schema";

@Injectable()
export class PostSqlRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}
  async createForBlog(
    dto: createdPosForBlogtDtoType,
    blogId: string,
    blogName: string
  ): Promise<postSqlDbType> {
    const { title, shortDescription, content } = dto;
    const newPost = await this.dataSource.query<postSqlDbType>(
      `
            insert into public."Posts"
            ("title","shortDescription","content","blogId","blogName","createdAt")
            values($1,$2,$3,$4,$5,'${new Date().toISOString()}')
            returning * ;
        `,
      [title, shortDescription, content, blogId, blogName]
    );
    return newPost;
  }
  async create(
    dto: createdPostDtoType,
    blogName: string
  ): Promise<postSqlDbType> {
    const { title, content, shortDescription, blogId } = dto;
    const newPost = await this.dataSource.query<postSqlDbType>(
      `
            insert into public."Posts"
            ("title","shortDescription","content","blogId","blogName","createdAt")
            values($1,$2,$3,$4,$5,'${new Date().toISOString()}')
            returning * ;
        `,
      [title, shortDescription, content, blogId, blogName]
    );
    return newPost;
  }
  async findPostsForBlog(
    params: paramsPostPaginatorType,
    blogId: string,
    userId?: string
  ): Promise<viewAllPostsType> {
    const parametres = postHelper.postParamsMapper(params);
    const sortDirection = params.sortDirection
      ? params.sortDirection
      : SortDirection.desc;
    const skipCount =
      (+parametres.pageNumber - 1) * Number(parametres.pageSize);
    const query = `
        select * ,
        array(
        select row_to_json(row) from (
        select l."addedAt", l."userId", l."login"
        from public."PostLikes" l
        where p."id" = l."postId"
        )  as row ) as "newestLikes"
        from public."Posts" p
        where p."blogId" = $1;
        order by p."${parametres.sortBy}" ${sortDirection}
        limit ${+parametres.pageSize} offset ${skipCount}
        `;
    const totalCountQuery = `
       select count(*)
       from public."Posts" p
       where p."id" = $1 
    `;
    const totalCount = await this.dataSource.query(totalCountQuery, [blogId]);
    const posts = await this.dataSource.query<postDtoResponseType[]>(query, [
      blogId,
    ]);
    return {
      items: posts,
      totalCount,
      pagesCount: Math.ceil(+totalCount[0].count / +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: +parametres.pageSize,
    };
  }
}
