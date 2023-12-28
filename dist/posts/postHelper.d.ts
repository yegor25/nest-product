import { extendedLikesInfo } from "src/postLikes/like.schema";
import { Post, postDtoResponseType } from "./post.schema";
export declare const postHelper: {
    postViewMapper(post: Post, likes: extendedLikesInfo): postDtoResponseType;
};
