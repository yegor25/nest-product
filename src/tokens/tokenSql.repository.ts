import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Tokens } from "./token.entity";

@Injectable()
export class TokenSqlRepository {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    @InjectRepository(Tokens) protected tokenRepo: Repository<Tokens>
  ) {}
  async save(token: string, userId: string) {
    // const newToken = await this.dataSource.query(`
    //     insert into public."Tokens"
    //     ("userId","token")
    //     values($1,$2)
    // `,[userId, token])
    await this.tokenRepo
      .createQueryBuilder()
      .insert()
      .into(Tokens)
      .values({ token, userId })
      .execute();
    return;
  }
  async findTokenByUserId(userId: string, token: string): Promise<boolean> {
    // const query = await this.dataSource.query(`
    //     select * from public."Tokens" t
    //     where t."userId" = $1 AND t."token" = $2
    //     ;
    // `,[userId,token])
    const query = await this.tokenRepo
      .createQueryBuilder("t")
      .select()
      .where("t.userId = :userId AND t.token = :token", { userId,token })
      .getOne();
      console.log("query", query)
    if (query) return true;
    return false;
  }
}
