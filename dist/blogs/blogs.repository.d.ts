/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { Blog, createdDtoBlogType, paramsBlogPaginatorType, responseDtoBlogType } from "./blog.schema";
export declare class BlogRepository {
    private blogModel;
    constructor(blogModel: Model<Blog>);
    create(dto: createdDtoBlogType): Promise<Blog>;
    findById(id: string): Promise<Blog | null>;
    findBlogs(params: paramsBlogPaginatorType): Promise<responseDtoBlogType>;
    changeBlog(id: string, dto: createdDtoBlogType): Promise<Blog | null>;
    deleteById(id: string): Promise<boolean>;
    deleteAll(): Promise<any>;
}
