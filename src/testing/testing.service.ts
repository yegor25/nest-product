import { Injectable } from "@nestjs/common";
import { BlogRepository } from "src/blogs/blogs.repository";
import { PostRepository } from "src/posts/post.repository";
import { UserRepository } from "src/users/user.repository";


@Injectable()
export class TestingService {
    constructor(
        protected userRepository: UserRepository,
        protected blogRepository: BlogRepository,
        protected postRepository: PostRepository
        ){}
    async deleteAllData(){
        await this.userRepository.deleteAll()
        await this.blogRepository.deleteAll()
        await this.postRepository.deleteAll()
        return
    }
}