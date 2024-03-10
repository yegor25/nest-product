import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import {
    allPostSqlViewType,
  createdPosForBlogtDtoType,
  createdPostDtoType,
  paramsPostPaginatorType,
  postDtoResponseType,
  postSqlDbType,
  postSqlQueryType,
  updatedPostDtoType,
  viewAllPostsType,
} from "./post.schema";
import { postHelper } from "./postHelper";
import { SortDirection } from "../users/user.schema";
import { LikeStatus } from "../postLikes/like.schema";

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
    console.log("new", newPost);
    return newPost[0];
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
  async findById(postId: string, userId?: string): Promise<postSqlQueryType | null> {
    const myId = userId ? userId : ''
    const post = await this.dataSource.query<postSqlQueryType[]>(`
    select * ,
        --(
          --  select row_to_json(row) from (
            --    select count(*) as "likesCount"
              --  from public."PostLikes" l
                --where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
            --) as row
           
        --) as "extendedLikesInfo",
        (
            select count(*) as "likesCount"
            from public."PostLikes" l
            where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
        ),
        (
            select count(*) as "dislikesCount"
            from public."PostLikes" l
            where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
        ),
       (
        select l."status" 
        from public."PostLikes" l
        where l."postId" = $1 and l."userId"::text = $2
       ) as "myStatus",
       
        array(
        select row_to_json(row) from (
        select l."addedAt", l."userId", l."login"
        from public."PostLikes" l
        where p."id" = l."postId"
        )  as row ) as "newestLikes"
        from public."Posts" p
        where p."id" = $1; 
    `,[postId, myId]);
    if(post[0]) return post[0]
    return null
  }
  async changeByBlogId(blogId: string, postId: string, dto:updatedPostDtoType):Promise<boolean>{
    const {shortDescription, title,content} = dto
    const changing = await this.dataSource.query(`
        update public."Posts" p
        set "shortDescription" = $1, "title" = $2, "content" = $3
        where p."id" = $4 and p."blogId" = $5
        returning *
        ; 
    `,[shortDescription,title,content,postId, blogId])
    if (changing[0].length) return true;
    return false;
  }
  async deleteByBlogId(postId: string, blogId: string):Promise<boolean>{
    const deleted = await this.dataSource.query(`
    Delete from public."Posts" p
    where p."id" = $1 and p."blogId" = $2
    `,[postId, blogId])
    if (deleted[1] === 1) return true;
    return false;
  }
  async findPosts(params: paramsPostPaginatorType, userId?: string):Promise<allPostSqlViewType>{
    const parametres = postHelper.postParamsMapper(params)
    const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
    const sortDirection = params.sortDirection ? params.sortDirection : SortDirection.desc
    const query = `
    select * ,

    (
        select count(*) as "likesCount"
        from public."PostLikes" l
        where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
    ),
    (
        select count(*) as "dislikesCount"
        from public."PostLikes" l
        where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
    ),
   (
    select l."status" 
    from public."PostLikes" l
    where l."userId"::text = $1
   ) as "myStatus",
   
    array(
    select row_to_json(row) from (
    select l."addedAt", l."userId", l."login"
    from public."PostLikes" l
    where p."id" = l."postId"
    )  as row ) as "newestLikes"
    from public."Posts" p
    order by p."${parametres.sortBy}" ${sortDirection}
    limit ${+parametres.pageSize} offset ${skipCount}
    `
    const posts = await this.dataSource.query<postSqlQueryType[]>(query,[userId])
    const totalCount = await this.dataSource.query<{count: string}[]>(`
        select count(*)
        from public."Posts";
    `)
    console.log("totta", totalCount)
    return {
        pagesCount: Math.ceil(+(totalCount[0].count) / +parametres.pageSize),
        page: parametres.pageNumber,
        pageSize: parametres.pageSize,
        totalCount: +(totalCount[0].count),
        items: posts,
    }
  }
}
