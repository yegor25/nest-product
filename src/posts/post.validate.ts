import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { BlogService } from "../blogs/blog.service";
import { BlogRepository } from "../blogs/blogs.repository";
import { Injectable } from "@nestjs/common";



@ValidatorConstraint({name:"postValidator", async:true})
export class PostValidator implements ValidatorConstraintInterface {
    constructor(
        protected blogService:BlogService,
    ){}

    async validate(value: string):  Promise<boolean> {
        console.log("post", value,this.blogService)
        if(!value) return false
        const blog = await this.blogService.findById(value)
        return !!blog
     }

     defaultMessage(validationArguments?: ValidationArguments | undefined): string {
         return "invalid blogId"
     }
}