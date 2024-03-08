import { PostRepository } from "./post.repository";
import { createdPosForBlogtDtoType, createdPostDtoType, paramsPostPaginatorType, postDtoResponseType, updatedPostDtoType, viewAllPostsType } from "./post.schema";
import { BlogService } from "../blogs/blog.service";
import { PostLikeService } from "../postLikes/postLike.service";
import { LikeStatus } from "../postLikes/like.schema";
import { SuperAdminBlogService } from "../sa-blogs/sa.blogs.service";
import { PostSqlRepository } from "./post.sqlRepository";
export declare class PostService {
    protected blogService: BlogService;
    protected postLikeService: PostLikeService;
    protected saBlogService: SuperAdminBlogService;
    protected postSqlRepository: PostSqlRepository;
    protected postRepository: PostRepository;
    constructor(blogService: BlogService, postLikeService: PostLikeService, saBlogService: SuperAdminBlogService, postSqlRepository: PostSqlRepository, postRepository: PostRepository);
    create(dto: createdPostDtoType): Promise<postDtoResponseType | null>;
    createForBlog(dto: createdPosForBlogtDtoType, blogId: string): Promise<postDtoResponseType | null>;
    changePost(dto: createdPostDtoType, postId: string): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    findPostById(id: string, userId?: string): Promise<postDtoResponseType | null>;
    findPosts(params: paramsPostPaginatorType, userId?: string): Promise<viewAllPostsType>;
    findPostsForBlog(params: paramsPostPaginatorType, blogId: string, userId?: string): Promise<viewAllPostsType | null>;
    changeLikeStatus(userId: string, postId: string, likeStatus: LikeStatus, login: string): Promise<boolean | void>;
    changeByBlogId(blogId: string, postId: string, dto: updatedPostDtoType): Promise<boolean>;
    deleteAll(): Promise<any>;
}
