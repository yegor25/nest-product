import { Injectable } from "@nestjs/common";
import { PostLikeRepository } from "./postLike.repository";
import { LikeStatus } from "./like.schema";



@Injectable()
export class PostLikeService {
    constructor(
        private postLikeRepository: PostLikeRepository
    ){}
    async checkReaction(userId: string, postId: string):Promise<boolean>{
        return this.postLikeRepository.checkReaction(userId, postId)
    }

    async changeExistReaction(userId:string, postId: string, likeStatus: LikeStatus){
        return this.postLikeRepository.changeExistReaction(userId, postId, likeStatus)
    }

    async addNewReaction(userId:string, postId: string, likeStatus: LikeStatus, login: string){
        return this.postLikeRepository.addNewReaction(userId, postId, likeStatus,login)
    }
    async getByPostId(postId: string){
        return this.postLikeRepository.getByPostId(postId)

    }
    async getAll(){
        return this.postLikeRepository.getAll()
    }
}