import { SortDirection } from "src/users/user.schema";
import { extendedLikesInfo } from "../postLikes/like.schema";
import { Post, dbPostsPaginatorType, paramsPostPaginatorType, postDtoResponseType } from "./post.schema";



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
    },
    postParamsMapper (params: paramsPostPaginatorType):dbPostsPaginatorType {
        const res:dbPostsPaginatorType = {
            sortDirection: params.sortDirection === SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : 'createdAt'
        }
        return res
    },
}