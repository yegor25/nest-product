import { BlogRepository } from "src/blogs/blogs.repository";
import { PostRepository } from "src/posts/post.repository";
import { SuperUsersService } from "src/super-users/superUsers.service";
import { UserRepository } from "src/users/user.repository";
export declare class TestingService {
    protected userRepository: UserRepository;
    protected blogRepository: BlogRepository;
    protected postRepository: PostRepository;
    protected suService: SuperUsersService;
    constructor(userRepository: UserRepository, blogRepository: BlogRepository, postRepository: PostRepository, suService: SuperUsersService);
    deleteAllData(): Promise<void>;
}
