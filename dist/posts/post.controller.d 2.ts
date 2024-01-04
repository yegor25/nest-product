import { PostService } from "./post.service";
import { createdPostDtoType, paramsPostPaginatorType } from "./post.schema";
export declare class PostController {
    protected postService: PostService;
    constructor(postService: PostService);
    createPost(body: createdPostDtoType): Promise<import("./post.schema").postDtoResponseType>;
    findPosts(params: paramsPostPaginatorType): Promise<import("./post.schema").viewAllPostsType>;
    findPostById(postId: string): Promise<import("./post.schema").postDtoResponseType>;
    changePost(postId: string, body: createdPostDtoType): Promise<void>;
    deletePost(postId: string): Promise<void>;
}
