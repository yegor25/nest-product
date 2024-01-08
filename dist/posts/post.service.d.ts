import { PostRepository } from "./post.repository";
import { createdPosForBlogtDtoType, createdPostDtoType, paramsPostPaginatorType, postDtoResponseType, viewAllPostsType } from "./post.schema";
import { BlogService } from "../blogs/blog.service";
import { PostLikeService } from "../postLikes/postLike.service";
import { LikeStatus } from "../postLikes/like.schema";
export declare class PostService {
    protected postRepository: PostRepository;
    protected blogService: BlogService;
    protected postLikeService: PostLikeService;
    constructor(postRepository: PostRepository, blogService: BlogService, postLikeService: PostLikeService);
    create(dto: createdPostDtoType): Promise<postDtoResponseType>;
    createForBlog(dto: createdPosForBlogtDtoType, blogId: string): Promise<postDtoResponseType | null>;
    changePost(dto: createdPostDtoType, postId: string): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    findPostById(id: string, userId?: string): Promise<postDtoResponseType | null>;
    findPosts(params: paramsPostPaginatorType, userId?: string): Promise<viewAllPostsType>;
    findPostsForBlog(params: paramsPostPaginatorType, blogId: string, userId?: string): Promise<viewAllPostsType | null>;
    changeLikeStatus(userId: string, postId: string, likeStatus: LikeStatus, login: string): Promise<boolean | void>;
    deleteAll(): Promise<import("mongodb").DeleteResult>;
}
