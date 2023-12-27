



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

export type createdDtoBlogType = {
    name: string,
    description: string,
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