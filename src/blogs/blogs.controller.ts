import { Body, Controller, Post } from "@nestjs/common";
import { createdDtoBlogType } from "./blog.schema";
import { BlogService } from "./blog.service";



@Controller('blogs')
export class BlogController {
    constructor(protected blogService:BlogService){}
    @Post()
    async createBlog(@Body() body: createdDtoBlogType){
        return this.blogService.create(body)
    }
}