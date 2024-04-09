import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
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
import { Post } from "./post.entity";

@Injectable()
export class PostSqlRepository {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    @InjectRepository(Post) protected postRepo: Repository<Post>
  ) {}
  async createForBlog(
    dto: createdPosForBlogtDtoType,
    blogId: string,
    blogName: string
  ): Promise<postSqlDbType> {
    const { title, shortDescription, content } = dto;
    // const newPost = await this.dataSource.query<postSqlDbType>(
    //   `
    //         insert into public."Posts"
    //         ("title","shortDescription","content","blogId","blogName","createdAt")
    //         values($1,$2,$3,$4,$5,'${new Date().toISOString()}')
    //         returning * ;
    //     `,
    //   [title, shortDescription, content, blogId, blogName]
    // );
    // console.log("new", newPost);
    const newPost = await this.postRepo
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values({
        title,
        shortDescription,
        content,
        blogId,
        blogName,
        createdAt: new Date().toISOString(),
      })
      .returning("*")
      .execute();
    return newPost.raw[0];
  }
  async create(
    dto: createdPostDtoType,
    blogName: string
  ): Promise<postSqlDbType> {
    const { title, content, shortDescription, blogId } = dto;
    // const newPost = await this.dataSource.query<postSqlDbType>(
    //   `
    //         insert into public."Posts"
    //         ("title","shortDescription","content","blogId","blogName","createdAt")
    //         values($1,$2,$3,$4,$5,'${new Date().toISOString()}')
    //         returning * ;
    //     `,
    //   [title, shortDescription, content, blogId, blogName]
    // );
    const newPost = await this.postRepo
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values({
        title,
        shortDescription,
        content,
        blogId,
        blogName,
        createdAt: new Date().toISOString(),
      })
      .returning("*")
      .execute();
    return newPost.raw[0];
  }
  async findPostsForBlog(
    params: paramsPostPaginatorType,
    blogId: string,
    userId?: string
  ): Promise<viewAllPostsType> {
    const parametres = postHelper.postParamsMapper(params);
    const sortDirection = params.sortDirection
      ? params.sortDirection.toUpperCase()
      : SortDirection.desc;
    const skipCount =
      (+parametres.pageNumber - 1) * Number(parametres.pageSize);
    // const query = `
    //     select p.* ,
    //     (
    //         select count(*) as "likesCount"
    //         from public."PostLikes" l
    //         where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
    //     ),
    //     (
    //         select count(*) as "dislikesCount"
    //         from public."PostLikes" l
    //         where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
    //     ),
    //    (
    //     select l."status"
    //     from public."PostLikes" l
    //     where l."postId" = p."id" and l."userId"::text = $2
    //    ) as "myStatus",
    //     array(
    //     select row_to_json(row) from (
    //     select l."addedAt", l."userId", l."login"
    //     from public."PostLikes" l
    //     where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
    //     order by l."addedAt" desc
    //     limit 3 offset 0
    //     )  as row ) as "newestLikes"
    //     from public."Posts" p
    //     where p."blogId" = $1;
    //     order by p."${parametres.sortBy}" ${sortDirection}
    //     limit ${+parametres.pageSize} offset ${skipCount}
    //     `;
    const posts = await this.postRepo
      .createQueryBuilder("p")
      .select("p.*")
      .addSelect(
        `(
          select count(*) as "likesCount"
            from public."PostLikes" l
             where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
        )`
      )
      .addSelect(
        `(
          select count(*) as "dislikesCount"
            from public."PostLikes" l
             where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
        )`
      )
      .addSelect(`(
        select l."status" as "myStatus"
            from public."PostLikes" l
             where l."postId" = p."id" and l."userId"::text = '${userId}'
      )`)
      .addSelect(
        `(
          array(
                select row_to_json(row) from (
                 select l."addedAt", l."userId", l."login"
                 from public."PostLikes" l
                 where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
                 order by l."addedAt" desc
                 limit 3 offset 0
                 )  as row ) as "newestLikes"
        )`
      )
      .where(`p.blogId = :blogId`, { blogId })
      .orderBy(`p.${parametres.sortBy}`, `${sortDirection as SortDirection}`)
      .take(+parametres.pageSize)
      .skip(skipCount)
      .execute();
    // const totalCountQuery = `
    //    select count(*)
    //    from public."Posts" p
    //    where p."blogId" = $1
    // `;
    // const totalCount = await this.dataSource.query(totalCountQuery, [blogId]);
    // const posts = await this.dataSource.query<postDtoResponseType[]>(query, [
    //   blogId,
    // ]);
    const totalCount = await this.postRepo
      .createQueryBuilder("p")
      .select()
      .where("p.blogId = :blogId", { blogId })
      .getCount();
    return {
      items: posts,
      totalCount,
      pagesCount: Math.ceil(totalCount / +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: +parametres.pageSize,
    };
  }
  async findById(
    postId: string,
    userId?: string
  ): Promise<postSqlQueryType | null> {
    const myId = userId ? userId : "";
    // const post = await this.dataSource.query<postSqlQueryType[]>(
    //   `
    // select * ,

    //     (
    //         select count(*) as "likesCount"
    //         from public."PostLikes" l
    //         where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
    //     ),
    //     (
    //         select count(*) as "dislikesCount"
    //         from public."PostLikes" l
    //         where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
    //     ),
    //    (
    //     select l."status"
    //     from public."PostLikes" l
    //     where l."postId" = $1 and l."userId"::text = $2
    //    ) as "myStatus",

    //     array(
    //     select row_to_json(row) from (
    //     select l."addedAt", l."userId", l."login"
    //     from public."PostLikes" l
    //     where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
    //     order by l."addedAt" desc
    //     limit 3 offset 0
    //     )  as row ) as "newestLikes"
    //     from public."Posts" p
    //     where p."id" = $1
    //     ;
    // `,
    //   [postId, myId]
    // );
    const post = await this.postRepo
      .createQueryBuilder("p")
      .select([
        "p.id as id",
        "p.title as title",
        `p.shortDescription as "shortDescription"`,
        `p.content as content`,
        `p.blogName as "blogName"`,
        `p.createdAt as "createdAt"`,
        `p.blogId as "blogId"`
      ])
      .addSelect(
        `(
          select count(*) as "likesCount"
            from public."PostLikes" l
             where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
        )`
      )
      .addSelect(
        `(
          select count(*) as "dislikesCount"
            from public."PostLikes" l
             where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
        )`
      )
      .addSelect(`(
        select l."status" as "myStatus"
            from public."PostLikes" l
             where l."postId" = p."id" and l."userId"::text = '${myId}'
      )`)
      .addSelect(
        `(
          array(
                select row_to_json(row) from (
                 select l."addedAt", l."userId", l."login"
                 from public."PostLikes" l
                 where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
                 order by l."addedAt" desc
                 limit 3 offset 0
                 )  as row ) 
        ) as "newestLikes"`
      )
      .where("p.id = :id", { id: postId })
      .getRawOne();
    if (post) return post
    return null;
  }
  async changeByBlogId(
    blogId: string,
    postId: string,
    dto: updatedPostDtoType
  ): Promise<boolean> {
    const { shortDescription, title, content } = dto;
    // const changing = await this.dataSource.query(
    //   `
    //     update public."Posts" p
    //     set "shortDescription" = $1, "title" = $2, "content" = $3
    //     where p."id" = $4 and p."blogId" = $5
    //     returning *
    //     ;
    // `,
    //   [shortDescription, title, content, postId, blogId]
    // );
    const changing = await this.postRepo
      .createQueryBuilder()
      .update(Post)
      .set({
        shortDescription,
        title,
        content,
      })
      .where("id = :id AND blogId = :blogId", { id: postId, blogId })
      .execute();
    if (changing.affected === 1) return true;
    return false;
  }
  async deleteByBlogId(postId: string, blogId: string): Promise<boolean> {
    // const deleted = await this.dataSource.query(
    //   `
    // Delete from public."Posts" p
    // where p."id" = $1 and p."blogId" = $2
    // `,
    //   [postId, blogId]
    // );
    const deleted = await this.postRepo
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where("id = :id AND blogId = :blogId", { id: postId, blogId })
      .execute();
    if (deleted.affected === 1) return true;
    return false;
  }
  async findPosts(
    params: paramsPostPaginatorType,
    userId?: string
  ): Promise<allPostSqlViewType> {
    const parametres = postHelper.postParamsMapper(params);
    const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
    const sortDirection = params.sortDirection
      ? params.sortDirection.toUpperCase()
      : SortDirection.desc;
    //   const query = `
    //   select p.* ,

    //   (
    //       select count(*) as "likesCount"
    //       from public."PostLikes" l
    //       where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
    //   ),
    //   (
    //       select count(*) as "dislikesCount"
    //       from public."PostLikes" l
    //       where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
    //   ),
    //  (
    //   select l."status"
    //   from public."PostLikes" l
    //   where l."userId"::text = $1  and l."postId" = p."id"
    //  ) as "myStatus",

    //   array(
    //   select row_to_json(row) from (
    //   select l."addedAt", l."userId", l."login"
    //   from public."PostLikes" l
    //   where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
    //   order by l."addedAt" desc
    //   limit 3 offset 0
    //   )  as row ) as "newestLikes"
    //   from public."Posts" p
    //   order by p."${parametres.sortBy}" ${sortDirection}
    //   limit ${+parametres.pageSize} offset ${skipCount}
    //   `;
    // const posts = await this.dataSource.query<postSqlQueryType[]>(query, [
    //   userId,
    // ]);
    // const totalCount = await this.dataSource.query<{ count: string }[]>(`
    //     select count(*)
    //     from public."Posts";
    // `);
    const posts = await this.postRepo
      .createQueryBuilder("p")
      .select([
        "p.id as id",
        "p.title as title",
        `p.shortDescription as "shortDescription"`,
        `p.content as content`,
        `p.blogName as "blogName"`,
        `p.createdAt as "createdAt"`,
        `p.blogId as "blogId"`
      ])
      .addSelect(
        `(
          select count(*) as "likesCount"
            from public."PostLikes" l
             where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
        )`
      )
      .addSelect(
        `(
          select count(*) as "dislikesCount"
            from public."PostLikes" l
             where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
        )`
      )
      .addSelect(`(
        select l."status" as "myStatus"
            from public."PostLikes" l
             where l."postId" = p."id" and l."userId"::text = '${userId}'
      )`)
      .addSelect(
        `(
          array(
                select row_to_json(row) from (
                 select l."addedAt", l."userId", l."login"
                 from public."PostLikes" l
                 where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
                 order by l."addedAt" desc
                 limit 3 offset 0
                 )  as row ) 
        ) as "newestLikes"`
      )
      .orderBy(`p.${parametres.sortBy}`, `${sortDirection as SortDirection}`)
      .take(+parametres.pageSize)
      .skip(skipCount)
      .execute();

    const totalCount: number = await this.postRepo
      .createQueryBuilder()
      .select()
      .getCount();
    return {
      pagesCount: Math.ceil(totalCount / +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: parametres.pageSize,
      totalCount: totalCount,
      items: posts
    };
  }
  async findPostsForBlogId(
    params: paramsPostPaginatorType,
    blogId: string,
    userId?: string
  ): Promise<allPostSqlViewType> {
    const parametres = postHelper.postParamsMapper(params);
    const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
    const sortDirection = params.sortDirection
      ? params.sortDirection.toUpperCase()
      : SortDirection.desc;
    //   const query = `
    //   select p.*,

    //   (
    //       select count(*) as "likesCount"
    //       from public."PostLikes" l
    //       where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
    //   ),
    //   (
    //       select count(*) as "dislikesCount"
    //       from public."PostLikes" l
    //       where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
    //   ),
    //  (
    //   select l."status"
    //   from public."PostLikes" l
    //   where l."userId"::text = $1  and l."postId" = p."id"
    //  ) as "myStatus",

    //   array(
    //   select row_to_json(row) from (
    //   select l."addedAt", l."userId", l."login"
    //   from public."PostLikes" l
    //   where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
    //   order by l."addedAt" desc
    //   limit 3 offset 0
    //   )  as row ) as "newestLikes"
    //   from public."Posts" p
    //   where p."blogId" = $2
    //   order by p."${parametres.sortBy}" ${sortDirection}
    //   limit ${+parametres.pageSize} offset ${skipCount}
    //   `;
    // const posts = await this.dataSource.query<postSqlQueryType[]>(query, [
    //   userId,
    //   blogId,
    // ]);

    // const totalCount = await this.dataSource.query<{ count: string }[]>(
    //   `
    //     select count(*)
    //     from public."Posts" p
    //     where p."blogId" = $1
    // `,
    //   [blogId]
    // );
    const posts = await this.postRepo
      .createQueryBuilder("p")
      .select([
        "p.id as id",
        "p.title as title",
        `p.shortDescription as "shortDescription"`,
        `p.content as content`,
        `p.blogName as "blogName"`,
        `p.createdAt as "createdAt"`,
        `p.blogId as "blogId"`
      ])
      .addSelect(
        `(
          select count(*) as "likesCount"
            from public."PostLikes" l
             where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
        )`
      )
      .addSelect(
        `(
          select count(*) as "dislikesCount"
            from public."PostLikes" l
             where p."id" = l."postId" and l."status" = '${LikeStatus.Dislike}'
        )`
      )
      .addSelect(`(
        select l."status" as "myStatus"
            from public."PostLikes" l
             where l."postId" = p."id" and l."userId"::text = '${userId}'
      )`)
      .addSelect(
        `(
          array(
                select row_to_json(row) from (
                 select l."addedAt", l."userId", l."login"
                 from public."PostLikes" l
                 where p."id" = l."postId" and l."status" = '${LikeStatus.Like}'
                 order by l."addedAt" desc
                 limit 3 offset 0
                 )  as row ) 
        ) as "newestLikes"`
      )
      .where("p.blogId = :blogId", { blogId })
      .orderBy(`p.${parametres.sortBy}`, `${sortDirection as SortDirection}`)
      .take(+parametres.pageSize)
      .skip(skipCount)
      .execute();

    const totalCount = await this.postRepo
      .createQueryBuilder("p")
      .select()
      .where("p.blogId = :blogId", { blogId })
      .getCount();
    return {
      pagesCount: Math.ceil(totalCount / +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: parametres.pageSize,
      totalCount: totalCount,
      items: posts
    };
  }
}
