import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LikeStatus } from "./like.schema";

@Injectable()
export class PostLikeSqlRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}
  async create(userId:string, postId: string, likeStatus: LikeStatus, login: string){
        const newReaction = await this.dataSource.query(`
            insert into public."PostLikes"
            ("userId","postId","login","status")
            values($1,$2,$3,$4);
        `,[userId,postId,login,likeStatus])
        return
  }
  async getByPostId(postId: string){
    return this.dataSource.query(`
        select * from public."PostLikes" p
        where p."postId" = $1;
    `,[postId])
  }
  async checkReaction(userId: string, postId: string):Promise<boolean>{
    const reaction = await this.dataSource.query(`
        select * from public."PostLikes" p 
        where p."userId" = $1 AND p."postId" = $2;
    `,[userId, postId])
    if(reaction[0]) return true
    return false
  }

  async changeExistReaction(userId: string, postId: string, likeStatus: LikeStatus){
    return this.dataSource.query(`
        update public."PostLikes" p
        set "status" = $1
        where p."postId" = $2 AND p."userId" = $3;
    `,[likeStatus,postId,userId])
  }
  
}
