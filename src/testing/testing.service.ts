import { Injectable } from "@nestjs/common";
import { BlogRepository } from "../blogs/blogs.repository";
import { PostRepository } from "../posts/post.repository";
import { SuperUsersService } from "../super-users/superUsers.service";
import { UserRepository } from "../users/user.repository";
import { SuperAdminBlogService } from "../sa-blogs/sa.blogs.service";
import { CommentsSqlRepository } from "../comments/commentsSql.repository";
import { QuizRepository } from "src/quiz/repositories/quiz.repository";


@Injectable()
export class TestingService {
    constructor(
        protected userRepository: UserRepository,
        protected blogRepository: BlogRepository,
        protected postRepository: PostRepository,
        protected suService: SuperUsersService,
        protected saBlogsService: SuperAdminBlogService,
        protected commentRepo: CommentsSqlRepository,
        protected quizRepo: QuizRepository
        ){}
    async deleteAllData(){
        // await this.userRepository.deleteAll()
        // await this.blogRepository.deleteAll()
        // await this.postRepository.deleteAll()
        await this.suService.deleteAll()
        await this.saBlogsService.deleteAll()
        await this.commentRepo.deleteAll()
        await this.quizRepo.deleteAll()
        return
    }
}