import { LikesPost } from "../postLikes/like.schema";
import { Post, dbPostsPaginatorType, paramsPostPaginatorType, postDtoResponseType, postSqlDbType } from "./post.schema";
export declare const postHelper: {
    postViewMapperDefault(post: postSqlDbType): postDtoResponseType;
    postViewMapper(post: Post, likePosts: LikesPost[], userId?: string): postDtoResponseType;
    postParamsMapper(params: paramsPostPaginatorType): dbPostsPaginatorType;
};
