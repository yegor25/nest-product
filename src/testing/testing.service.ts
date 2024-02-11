import { Injectable } from "@nestjs/common";
import { BlogRepository } from "src/blogs/blogs.repository";
import { PostRepository } from "src/posts/post.repository";
import { SuperUsersService } from "src/super-users/superUsers.service";
import { UserRepository } from "src/users/user.repository";


@Injectable()
export class TestingService {
    constructor(
        protected userRepository: UserRepository,
        protected blogRepository: BlogRepository,
        protected postRepository: PostRepository,
        protected suService: SuperUsersService
        ){}
    async deleteAllData(){
        await this.userRepository.deleteAll()
        await this.blogRepository.deleteAll()
        await this.postRepository.deleteAll()
        await this.suService.deleteAll()
        return
    }
}