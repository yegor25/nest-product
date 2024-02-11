import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { CreatedUserDtoDbType, userSqlDbType } from "./user.schema";
import bcrypt from "bcrypt"

@Injectable()
export class UserSqlRepository {
    constructor(
        @InjectDataSource() protected dataSource:DataSource
    ){}

    async validate(loginOrEmail: string, pass: string):Promise<userSqlDbType | null> {
        const user = await this.dataSource.query<userSqlDbType[]>(`
            select * from public."Users" u
            where u."login" = $1 or u."email" = $1
        `,[loginOrEmail])
        if(!user[0]) return null
        const isMatchedPasswords = await bcrypt.compare(pass, user[0].passwordHash)
        if(!isMatchedPasswords) return null
        return user[0]
    }

    async findById(id: string):Promise<userSqlDbType | null>{
        const user = await this.dataSource.query<userSqlDbType[]>(`
            select * from public."Users" u
            where u."id" = $1;
        `,[id])
        if(!user[0]) return null 
        return user[0]
    }
    async registerUser (dto:CreatedUserDtoDbType):Promise<string>{
        const user = await this.dataSource.query<{id: string, createdAt: string}[]>(`
            insert into public."Users"
            ("email","login","passwordSalt","passwordHash","isActiveAccount","createdAt")
            values('${dto.email}','${dto.login}','${dto.passwordSalt}','${dto.hashPassword}','false','${new Date().toISOString()}')
            returning "id","createdAt"
        ;
        `)
        return user[0].id
    }
   
    async checkCodeConfirmation(code: string):Promise<{userId: string,expirationDate: Date,isActiveAccount: boolean}>{
        const user = await this.dataSource.query<{userId: string,expirationDate: Date,isActiveAccount: boolean}[]>(`
                select c."userId",c."expirationDate",u."isActiveAccount"
                from public."ConfirmationData" as c
                Left JOIN public."Users" u
                ON c."userId" = u.id
                WHERE c."code" = $1;
        `,[code])
        return user[0]
    }

    async activateAccount(userId: string):Promise<userSqlDbType>{
        const activeUser = await this.dataSource.query<userSqlDbType[]>(`
        update public."Users" as u
        set "isActiveAccount" = 'true'
        where u."id" = $1
        returning *;
        `,[userId])
        return activeUser[0]
    }
    async validateResendingUser(email: string):Promise<boolean>{
        const user = await this.dataSource.query<{isActiveAccount: boolean}[]>(`
        select u."isActiveAccount" from public."Users"
        where u."email" = $1;
        `,[email])
        if(user[0] && !user[0].isActiveAccount) return true
        return false
       }
    
}