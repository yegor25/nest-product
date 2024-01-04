



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Prop()
  websiteUrl: string;

  @Prop({
    default: false
  })
  isMembership: boolean;

  
}

export type blogItemsResponseType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export class createdDtoBlogType  {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(15)
    name: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    description: string;

    @IsNotEmpty()
    @Matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    websiteUrl: string
}
export type PaginatorType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
  };
  
  export enum SortDirection {
    asc = 'asc',
    desc = 'desc',
  }
export type responseDtoBlogType = PaginatorType & {
    items: blogItemsResponseType[]
}

export type paramsBlogPaginatorType = {
    pageNumber: string;
    pageSize: string;
    searchNameTerm: string;
    sortBy: keyof Blog;
    sortDirection: SortDirection;
  };
export type dbBlogPaginatorType = {
    searchNameTerm: string;
    sortBy: keyof Blog;
    sortDirection: 1 | -1;
    pageNumber: number;
    pageSize: number;
  };

export const BlogSchema = SchemaFactory.createForClass(Blog)