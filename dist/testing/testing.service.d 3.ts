import { BlogRepository } from "../blogs/blogs.repository";
import { PostRepository } from "../posts/post.repository";
import { SuperUsersService } from "../super-users/superUsers.service";
import { UserRepository } from "../users/user.repository";
export declare class TestingService {
    protected userRepository: UserRepository;
    protected blogRepository: BlogRepository;
    protected postRepository: PostRepository;
    protected suService: SuperUsersService;
    constructor(userRepository: UserRepository, blogRepository: BlogRepository, postRepository: PostRepository, suService: SuperUsersService);
    deleteAllData(): Promise<void>;
}
