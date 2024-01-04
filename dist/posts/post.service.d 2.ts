import { PostRepository } from "./post.repository";
import { createdPosForBlogtDtoType, createdPostDtoType, paramsPostPaginatorType, postDtoResponseType, viewAllPostsType } from "./post.schema";
import { BlogService } from "../blogs/blog.service";
export declare class PostService {
    protected postRepository: PostRepository;
    protected blogService: BlogService;
    constructor(postRepository: PostRepository, blogService: BlogService);
    create(dto: createdPostDtoType): Promise<postDtoResponseType>;
    createForBlog(dto: createdPosForBlogtDtoType, blogId: string): Promise<postDtoResponseType | null>;
    changePost(dto: createdPostDtoType, postId: string): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    findPostById(id: string): Promise<postDtoResponseType | null>;
    findPosts(params: paramsPostPaginatorType): Promise<viewAllPostsType>;
    findPostsForBlog(params: paramsPostPaginatorType, blogId: string): Promise<viewAllPostsType | null>;
    deleteAll(): Promise<import("mongodb").DeleteResult>;
}
