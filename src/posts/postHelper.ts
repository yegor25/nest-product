import { SortDirection } from "src/users/user.schema";
import { extendedLikesInfo, LikesPost, LikeStatus, postLikeType } from "../postLikes/like.schema";
import { Post, dbPostsPaginatorType, paramsPostPaginatorType, postDtoResponseType } from "./post.schema";



export const postHelper = {
    postViewMapperDefault(post: Post):postDtoResponseType{
        let likesCount = 0
        let dislikesCount = 0
        let myStatus:LikeStatus = LikeStatus.None
        
        const res:postDtoResponseType = {
            id: post._id.toString(),
            blogId: post.blogId,
            shortDescription: post.shortDescription,
            title: post.title,
            content: post.content,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                likesCount,
                dislikesCount,
                myStatus,
                newestLikes:[]
            }
        }
        return res
    },
    postViewMapper(post: Post, likePosts: LikesPost[], userId?: string):postDtoResponseType{
        let likesCount = 0
        let dislikesCount = 0
        let myStatus:LikeStatus = LikeStatus.None
        likePosts.forEach(el => {
            if(el.status === LikeStatus.Like && el.postId === post._id.toString()){
                likesCount += 1
               if (el.userId === userId )myStatus = el.status
               return
            }
            if(el.status === LikeStatus.Dislike && el.postId === post._id.toString()){
                dislikesCount += 1
                if(el.userId === userId) myStatus = el.status
                return
            }
        })
        const newestLikes:postLikeType[] = likePosts.filter(el => el.status === LikeStatus.Like && el.postId === post._id.toString()).sort((a,b) => a.addedAt < b.addedAt ? 1 : -1).splice(0,3).map(el => ({addedAt: el.addedAt.toISOString(), userId: el.userId, login: el.login}))
        const res:postDtoResponseType = {
            id: post._id.toString(),
            blogId: post.blogId,
            shortDescription: post.shortDescription,
            title: post.title,
            content: post.content,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                likesCount,
                dislikesCount,
                myStatus,
                newestLikes:newestLikes
            }
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