import { Injectable } from "@nestjs/common";
import { PostLikeRepository } from "./postLike.repository";
import { LikeStatus } from "./like.schema";
import { PostLikeSqlRepository } from "./postLike.sqlRepository";



@Injectable()
export class PostLikeService {
    constructor(
        private postLikeRepository: PostLikeRepository,
        protected postLikeSqlRepository: PostLikeSqlRepository
    ){}
    async checkReaction(userId: string, postId: string):Promise<boolean>{
        // return this.postLikeRepository.checkReaction(userId, postId)
        return this.postLikeSqlRepository.checkReaction(userId, postId)
    }

    async changeExistReaction(userId:string, postId: string, likeStatus: LikeStatus){
        // return this.postLikeRepository.changeExistReaction(userId, postId, likeStatus)
        return this.postLikeSqlRepository.changeExistReaction(userId, postId, likeStatus)
    }

    async addNewReaction(userId:string, postId: string, likeStatus: LikeStatus, login: string){
        // return this.postLikeRepository.addNewReaction(userId, postId, likeStatus,login)
        return this.postLikeSqlRepository.create(userId, postId, likeStatus, login)
    }
    async getByPostId(postId: string){
        // return this.postLikeRepository.getByPostId(postId)
        return this.postLikeSqlRepository.getByPostId(postId)

    }
    async getAll(){
        return this.postLikeRepository.getAll()
    }
}