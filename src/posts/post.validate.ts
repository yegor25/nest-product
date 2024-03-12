import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { BlogService } from "../blogs/blog.service";
import { BlogRepository } from "../blogs/blogs.repository";
import { Injectable } from "@nestjs/common";
import { SuperAdminBlogService } from "../sa-blogs/sa.blogs.service";



@ValidatorConstraint({name:"postValidator", async:true})
export class PostValidator implements ValidatorConstraintInterface {
    constructor(
        protected blogService:BlogService,
        protected saBlogService: SuperAdminBlogService
    ){}

    async validate(value: string):  Promise<boolean> {
        if(!value) return false
        const blog = await this.saBlogService.findById(value)
        return !!blog
     }

     defaultMessage(validationArguments?: ValidationArguments | undefined): string {
         return "invalid blogId"
     }
}