import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import {
  SortDirection,
  createdDtoBlogType,
  paramsBlogPaginatorType,
  responseDtoBlogType,
} from "../blogs/blog.schema";
import { DataSource, Repository } from "typeorm";
import { blogSqlDbType, responseDtoSqlBlogType } from "./sa.blogs.types";
import { blogHelper } from "../blogs/blog.helper";
import { Blog } from "../blogs/blog.entity";

@Injectable()
export class SuperAdminBlogsRepository {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    @InjectRepository(Blog) protected blogRepo: Repository<Blog>
  ) {}

  async create(dto: createdDtoBlogType): Promise<blogSqlDbType> {
    const { name, description, websiteUrl } = dto;
    // const newBlog = await this.dataSource.query<blogSqlDbType>(
    //   `
    //         insert into public."Blogs"
    //         ("name", "description","websiteUrl", "createdAt","isMembership")
    //         values($1,$2,$3,'${new Date().toISOString()}','false')
    //         returning *;
    //     `,
    //   [name, description, websiteUrl]
    // );
    const newBlog = await this.blogRepo
      .createQueryBuilder("b")
      .insert()
      .into(Blog)
      .values({
        name,
        description,
        websiteUrl,
        createdAt: new Date().toISOString(),
        isMembership: false,
      })
      .returning([`b."id",name,description,b."websiteUrl",b."createdAt",b."isMembership"`])
      .execute();
    return newBlog.raw[0];
  }
  async findById(id: string): Promise<blogSqlDbType | null> {
    // const blog = await this.dataSource.query<blogSqlDbType[]>(
    //   `
    //         select b."id", b."name", b."description", b."websiteUrl", b."createdAt", b."isMembership" from public."Blogs" b
    //         where b."id" = $1;
    //     `,
    //   [id]
    // );
    const blog = await this.blogRepo
      .createQueryBuilder()
      .select()
      .where("id = :id", { id })
      .getOne();
    if (!blog) return null;
    return blog;
  }
  async findBlogs(
    params: paramsBlogPaginatorType
  ): Promise<responseDtoSqlBlogType> {
     // const blogQuery = `
    //         select b."id", b."name", b."description", b."websiteUrl", b."createdAt", b."isMembership" from public."Blogs" b
    //         where b."name"  ilike '%${term}%'
    //         order by b."${parametres.sortBy}" ${sortDirection}
    //         limit ${+parametres.pageSize} offset ${skipCount}
    //         ;
    //     `;
    // const totalCountQuery = `
    //         select count(*)
    //         from public."Blogs" b
    //         where b."name"  ilike '%${term}%';
    //     `;
    // const blogs = await this.dataSource.query<blogSqlDbType[]>(blogQuery);
    // await this.dataSource.query<{ count: string }[]>(totalCountQuery);
    const parametres = blogHelper.blogParamsMapper(params);
    const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
    const term = params.searchNameTerm ? params.searchNameTerm : "";
    const sortDirection = params.sortDirection
      ? params.sortDirection.toUpperCase()
      : SortDirection.desc;
   
    const blogs = await this.blogRepo
      .createQueryBuilder("b")
      .select(`b."id",name,description,b."websiteUrl",b."createdAt",b."isMembership"`)
      .where("b.name ilike :term", { term: `%${term}%` })
      .orderBy(`b.${parametres.sortBy}`, `${sortDirection as SortDirection}`)
      .take(+parametres.pageSize)
      .skip(skipCount)
      .execute();
    const totalCount = await this.blogRepo
      .createQueryBuilder("b")
      .where("b.name ilike :term", { term: `%${term}%` })
      .getCount();
    
    const res: responseDtoSqlBlogType = {
      pagesCount: Math.ceil(totalCount/ +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: +parametres.pageSize,
      totalCount: totalCount,
      items: blogs,
     
    };
    return res;
  }
  async changeBlog(id: string, dto: createdDtoBlogType): Promise<boolean> {
    const { name, websiteUrl, description } = dto;
    // const changing = await this.dataSource.query(
    //   `
    //     update public."Blogs" u
    //     set "name" = $2, "websiteUrl" = $3, "description" = $4
    //     where u."id" = $1
    //     returning *
    //     ;
    //     `,
    //   [id, name, websiteUrl, description]
    // );
    const changing = await this.blogRepo
      .createQueryBuilder()
      .update(Blog)
      .set({ name, websiteUrl, description })
      .where("id = :id", { id })
      .execute();
    if (changing.affected === 1) return true;
    return false;
  }

  async deleteBlogById(blogId: string): Promise<boolean> {
    // const deleted = await this.dataSource.query(
    //   `
    //         Delete from public."Blogs" b
    //         where b."id" = $1
    //     `,
    //   [blogId]
    // );
    const deleted = await this.blogRepo
      .createQueryBuilder()
      .delete()
      .from(Blog)
      .where("id = :id", { id: blogId })
      .execute();

    if (deleted.affected === 1) return true;
    return false;
  }
  async deleteAll() {
    // return this.dataSource.query(`
    // Truncate public."Blogs" Cascade;
    //     `);
    return this.blogRepo.createQueryBuilder().delete().from(Blog).execute();
  }
}
