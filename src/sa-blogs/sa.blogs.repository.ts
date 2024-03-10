import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import {
  SortDirection,
  createdDtoBlogType,
  paramsBlogPaginatorType,
  responseDtoBlogType,
} from "../blogs/blog.schema";
import { DataSource } from "typeorm";
import { blogSqlDbType, responseDtoSqlBlogType } from "./sa.blogs.types";
import { blogHelper } from "../blogs/blog.helper";

@Injectable()
export class SuperAdminBlogsRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

  async create(dto: createdDtoBlogType): Promise<blogSqlDbType> {
    const { name, description, websiteUrl } = dto;
    const newBlog = await this.dataSource.query<blogSqlDbType>(
      `
            insert into public."Blogs"
            ("name", "description","websiteUrl", "createdAt","isMembership")
            values($1,$2,$3,'${new Date().toISOString()}','false')
            returning *;
        `,
      [name, description, websiteUrl]
    );
    return newBlog[0];
  }
  async findById(id: string): Promise<blogSqlDbType | null> {
    const blog = await this.dataSource.query<blogSqlDbType[]>(
      `
            select b."id", b."name", b."description", b."websiteUrl", b."createdAt", b."isMembership" from public."Blogs" b
            where b."id" = $1;
        `,
      [id]
    );
    if (!blog[0]) return null;
    return blog[0];
  }
  async findBlogs(
    params: paramsBlogPaginatorType
  ): Promise<responseDtoSqlBlogType> {
    const parametres = blogHelper.blogParamsMapper(params);
    const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
    const term = params.searchNameTerm ? params.searchNameTerm : "";
    console.log("term", term);
    const sortDirection = params.sortDirection
      ? params.sortDirection
      : SortDirection.desc;
    const blogQuery = `
            select b."id", b."name", b."description", b."websiteUrl", b."createdAt", b."isMembership" from public."Blogs" b
            where b."name"  ilike '%${term}%'
            order by b."${parametres.sortBy}" ${sortDirection}
            limit ${+parametres.pageSize} offset ${skipCount}
            ;
        `;
    const totalCountQuery = `
            select count(*)
            from public."Blogs" b
            where b."name"  ilike '%${term}%';
        `;
    const blogs = await this.dataSource.query<blogSqlDbType[]>(blogQuery);
    const totalCount =
      await this.dataSource.query<{ count: string }[]>(totalCountQuery);
    const res: responseDtoSqlBlogType = {
      pagesCount: Math.ceil(+totalCount[0].count / +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: +parametres.pageSize,
      totalCount: +totalCount[0].count,
      items: blogs,
    };
    return res;
  }
  async changeBlog(id: string, dto: createdDtoBlogType): Promise<boolean> {
    const { name, websiteUrl, description } = dto;
    const changing = await this.dataSource.query(
      `
        update public."Blogs" u
        set "name" = $2, "websiteUrl" = $3, "description" = $4
        where u."id" = $1
        returning *
        ;
        `,
      [id, name, websiteUrl, description]
    );
    if (changing[0].length) return true;
    return false;
  }

  async deleteBlogById(blogId: string): Promise<boolean> {
    const deleted = await this.dataSource.query(
      `
            Delete from public."Blogs" b
            where b."id" = $1
        `,
      [blogId]
    );
    if (deleted[1] === 1) return true;
    return false;
  }
  async deleteAll() {
    return this.dataSource.query(`
    Truncate public."Blogs" Cascade;
        `);
  }
}
