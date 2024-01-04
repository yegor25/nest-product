import { extendedLikesInfo } from "../postLikes/like.schema";
import { Post, dbPostsPaginatorType, paramsPostPaginatorType, postDtoResponseType } from "./post.schema";
export declare const postHelper: {
    postViewMapper(post: Post, likes: extendedLikesInfo): postDtoResponseType;
    postParamsMapper(params: paramsPostPaginatorType): dbPostsPaginatorType;
};
