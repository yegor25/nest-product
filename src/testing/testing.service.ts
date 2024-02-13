import { Injectable } from "@nestjs/common";
import { BlogRepository } from "../blogs/blogs.repository";
import { PostRepository } from "../posts/post.repository";
import { SuperUsersService } from "../super-users/superUsers.service";
import { UserRepository } from "../users/user.repository";


@Injectable()
export class TestingService {
    constructor(
        protected userRepository: UserRepository,
        protected blogRepository: BlogRepository,
        protected postRepository: PostRepository,
        protected suService: SuperUsersService
        ){}
    async deleteAllData(){
        // await this.userRepository.deleteAll()
        // await this.blogRepository.deleteAll()
        // await this.postRepository.deleteAll()
        await this.suService.deleteAll()
        return
    }
}