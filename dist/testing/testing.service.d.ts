import { BlogRepository } from "src/blogs/blogs.repository";
import { PostRepository } from "src/posts/post.repository";
import { UserRepository } from "src/users/user.repository";
export declare class TestingService {
    protected userRepository: UserRepository;
    protected blogRepository: BlogRepository;
    protected postRepository: PostRepository;
    constructor(userRepository: UserRepository, blogRepository: BlogRepository, postRepository: PostRepository);
    deleteAllData(): Promise<void>;
}
