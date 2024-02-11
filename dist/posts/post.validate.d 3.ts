import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { BlogService } from "../blogs/blog.service";
export declare class PostValidator implements ValidatorConstraintInterface {
    protected blogService: BlogService;
    constructor(blogService: BlogService);
    validate(value: string): Promise<boolean>;
    defaultMessage(validationArguments?: ValidationArguments | undefined): string;
}
