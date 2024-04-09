import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { LikeStatus } from "./like.schema";
import { PostLikes } from "./postLike.entity";

@Injectable()
export class PostLikeSqlRepository {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    @InjectRepository(PostLikes) protected plRepo: Repository<PostLikes>
  ) {}
  async create(
    userId: string,
    postId: string,
    likeStatus: LikeStatus,
    login: string
  ) {
    // const newReaction = await this.dataSource.query(`
    //     insert into public."PostLikes"
    //     ("userId","postId","login","status","addedAt")
    //     values($1,$2,$3,$4,'${new Date().toISOString()}');
    // `,[userId,postId,login,likeStatus])

    return this.plRepo
      .createQueryBuilder()
      .insert()
      .values({
        userId,
        postId,
        login,
        status: likeStatus,
        addedAt: new Date().toISOString(),
      })
      .execute();
  }
  async getByPostId(postId: string) {
    // return this.dataSource.query(
    //   `
    //     select * from public."PostLikes" p
    //     where p."postId" = $1;
    // `,
    //   [postId]
    // );
    return this.plRepo
      .createQueryBuilder()
      .select()
      .where("postId = :postId", { postId })
      .getOne();
  }
  async checkReaction(userId: string, postId: string): Promise<boolean> {
    // const reaction = await this.dataSource.query(
    //   `
    //     select * from public."PostLikes" p
    //     where p."userId" = $1 AND p."postId" = $2;
    // `,
    //   [userId, postId]
    // );
    const reaction = await this.plRepo
      .createQueryBuilder("p")
      .select()
      .where("p.postId = :postId AND p.userId = :userId", { postId, userId })
      .getOne();
     
    if (reaction) return true;
    return false;
  }

  async changeExistReaction(
    userId: string,
    postId: string,
    likeStatus: LikeStatus
  ) {
    // return this.dataSource.query(
    //   `
    //     update public."PostLikes" p
    //     set "status" = $1, "addedAt" = '${new Date().toISOString()}'
    //     where p."postId" = $2 AND p."userId" = $3;
    // `,
    //   [likeStatus, postId, userId]
    // );
    return this.plRepo.createQueryBuilder("p")
    .update(PostLikes)
    .set({status: likeStatus, addedAt: new Date().toISOString()})
    .where("p.postId = :postId AND p.userId = :userId", { postId, userId })
    .execute()
  }
}
