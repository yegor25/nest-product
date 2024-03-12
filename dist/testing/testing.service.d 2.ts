import { BlogRepository } from "../blogs/blogs.repository";
import { PostRepository } from "../posts/post.repository";
import { SuperUsersService } from "../super-users/superUsers.service";
import { UserRepository } from "../users/user.repository";
import { SuperAdminBlogService } from "../sa-blogs/sa.blogs.service";
export declare class TestingService {
    protected userRepository: UserRepository;
    protected blogRepository: BlogRepository;
    protected postRepository: PostRepository;
    protected suService: SuperUsersService;
    protected saBlogsService: SuperAdminBlogService;
    constructor(userRepository: UserRepository, blogRepository: BlogRepository, postRepository: PostRepository, suService: SuperUsersService, saBlogsService: SuperAdminBlogService);
    deleteAllData(): Promise<void>;
}
