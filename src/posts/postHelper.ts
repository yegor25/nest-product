import { extendedLikesInfo } from "../postLikes/like.schema";
import { Post, postDtoResponseType } from "./post.schema";



export const postHelper = {
    postViewMapper(post: Post, likes: extendedLikesInfo):postDtoResponseType{
        const res:postDtoResponseType = {
            id: post._id.toString(),
            blogId: post.blogId,
            shortDescription: post.shortDescription,
            title: post.title,
            content: post.content,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: likes
        }
        return res
    }
}