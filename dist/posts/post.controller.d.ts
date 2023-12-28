import { PostService } from "./post.service";
import { createdPostDtoType, paramsPostPaginatorType } from "./post.schema";
export declare class PostController {
    protected postService: PostService;
    constructor(postService: PostService);
    createPost(body: createdPostDtoType): Promise<import("./post.schema").postDtoResponseType>;
    findPosts(params: paramsPostPaginatorType): any;
    findPostById(postId: string): Promise<import("./post.schema").postDtoResponseType>;
    deletePost(postId: string): Promise<void>;
}
