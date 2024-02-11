import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";



@Injectable()
export class TokenSqlRepository {
    constructor(
        @InjectDataSource() protected dataSource: DataSource
    ){}
    async save(token: string, userId: string){
        const newToken = await this.dataSource.query(`
            insert into public."Tokens"
            ("userId","token")
            values($1,$2)
        `,[userId, token])
        return 
    }
    async findTokenByUserId(userId: string, token: string):Promise<boolean>{
        const query = await this.dataSource.query(`
            select * from public."Tokens" t
            where t."userId" = $1 AND t."token" = $2
            ;
        `,[userId,token])
        if(query[0]) return true
        return false
    }
}