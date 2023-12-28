import { PostRepository } from "./post.repository";
import { createdPostDtoType, paramsPostPaginatorType, postDtoResponseType, viewAllPostsType } from "./post.schema";
import { BlogService } from "../blogs/blog.service";
export declare class PostService {
    protected postRepository: PostRepository;
    protected blogService: BlogService;
    constructor(postRepository: PostRepository, blogService: BlogService);
    create(dto: createdPostDtoType): Promise<postDtoResponseType>;
    delete(id: string): Promise<boolean>;
    findPostById(id: string): Promise<postDtoResponseType | null>;
    findPosts(params: paramsPostPaginatorType): Promise<viewAllPostsType>;
    deleteAll(): Promise<import("mongodb").DeleteResult>;
}
