import { Module } from "@nestjs/common";
import { SuperAdminBlogsController } from "./sa.blogs.controller";
import { SuperAdminBlogService } from "./sa.blogs.service";
import { SuperAdminBlogsRepository } from "./sa.blogs.repository";




@Module({
    controllers: [SuperAdminBlogsController],
    providers: [SuperAdminBlogService,SuperAdminBlogsRepository],
    exports: []
})

export class SuperAdminBlogsModule {}