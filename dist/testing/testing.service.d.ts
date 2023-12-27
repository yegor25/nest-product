import { BlogRepository } from "src/blogs/blogs.repository";
import { UserRepository } from "src/users/user.repository";
export declare class TestingService {
    protected userRepository: UserRepository;
    protected blogRepository: BlogRepository;
    constructor(userRepository: UserRepository, blogRepository: BlogRepository);
    deleteAllData(): Promise<void>;
}
