import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { BlogService } from "../blogs/blog.service";
import { SuperAdminBlogService } from "src/sa-blogs/sa.blogs.service";
export declare class PostValidator implements ValidatorConstraintInterface {
    protected blogService: BlogService;
    protected saBlogService: SuperAdminBlogService;
    constructor(blogService: BlogService, saBlogService: SuperAdminBlogService);
    validate(value: string): Promise<boolean>;
    defaultMessage(validationArguments?: ValidationArguments | undefined): string;
}
