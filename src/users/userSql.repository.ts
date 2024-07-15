import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, InsertResult, Repository } from "typeorm";
import { CreatedUserDtoDbType, userSqlDbType } from "./user.schema";
import bcrypt from "bcrypt"
import { Users } from "./entities/user.entity";
import { ConfirmationData } from "./entities/confirmationData";

@Injectable()
export class UserSqlRepository {
    constructor(
        // @InjectDataSource() protected dataSource:DataSource
        @InjectRepository(Users) private usersRepository: Repository<Users>
    ){}

    async validate(loginOrEmail: string, pass: string):Promise<userSqlDbType | null> {
        // const user = await this.dataSource.query<userSqlDbType[]>(`
        //     select * from public."Users" u
        //     where u."login" = $1 or u."email" = $1
        // `,[loginOrEmail])
        // if(!user[0]) return null
        // const isMatchedPasswords = await bcrypt.compare(pass, user[0].passwordHash)
        // if(!isMatchedPasswords) return null
        // return user[0]
        const user = await this.usersRepository
        .createQueryBuilder("u")
        .where("u.login = :loginOrEmail or u.email = :loginOrEmail", {loginOrEmail})
        .getOne()
        if(!user) return null
        const isMatchedPasswords = await bcrypt.compare(pass, user.passwordHash)
        if(!isMatchedPasswords) return null
        return user
        
    }

    async findById(id: string):Promise<userSqlDbType | null>{
        // const user = await this.dataSource.query<userSqlDbType[]>(`
        //     select * from public."Users" u
        //     where u."id" = $1;
        // `,[id])
        const user = await this.usersRepository
        .createQueryBuilder("u")
        .where("u.id = :id",{id})
        .getOne()
        if(!user) return null 
        return user
    }
    async registerUser (dto:CreatedUserDtoDbType):Promise<string>{
        // const user = await this.dataSource.query<{id: string, createdAt: string}[]>(`
        //     insert into public."Users"
        //     ("email","login","passwordSalt","passwordHash","isActiveAccount","createdAt")
        //     values('${dto.email}','${dto.login}','${dto.passwordSalt}','${dto.hashPassword}','false','${new Date().toISOString()}')
        //     returning "id","createdAt"
        // ;
        // `)
        const user:InsertResult = await this.usersRepository
        .createQueryBuilder("u")
        .insert()
        .into(Users)
        .values({
            email: dto.email,
            login: dto.login,
            passwordSalt: dto.passwordSalt,
            passwordHash: dto.hashPassword,
            isActiveAccount: false,
            createdAt: new Date().toISOString()
        })
        .returning(["id"])
        .execute()
        
        return user.raw[0].id
    }
   
    async checkCodeConfirmation(code: string):Promise<{userId: string,expirationDate: Date,isActiveAccount: boolean} | null>{
        // const user = await this.dataSource.query<{userId: string,expirationDate: Date,isActiveAccount: boolean}[]>(`
        //         select c."userId",c."expirationDate",u."isActiveAccount"
        //         from public."ConfirmationData" c
        //         Left JOIN public."Users" u
        //         ON c."userId" = u."id"
        //         WHERE c."code" = $1;
        // `,[code])
        const user = await this.usersRepository
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.confirmationData","c")
        .where("c.code = :code",{code})
        .getOne()

        // .createQueryBuilder("u")
        // .select(`u."isActiveAccount"`)
        // .where("code = :code",{code})
        // .leftJoinAndSelect("u.confirmationData","c")
        // .getOne()
        
        console.log("users", user)
        if(!user) return null
        // return {userId: user.id, expirationDate: user.confirmationData.expirationDate, isActiveAccount: user.isActiveAccount}
        return {userId: user.id, expirationDate: new Date(), isActiveAccount: user.isActiveAccount}
    }

    async activateAccount(userId: string):Promise<userSqlDbType>{
        // const activeUser = await this.dataSource.query<userSqlDbType[]>(`
        // update public."Users" as u
        // set "isActiveAccount" = 'true'
        // where u."id" = $1
        // returning *;
        // `,[userId])
        const activeUser = await this.usersRepository
        .createQueryBuilder()
        .update(Users)
        .set({isActiveAccount: true})
        .where("id = :id",{id: userId})
        .returning("*")
        .execute()
        return activeUser.raw[0]
    }
    async validateResendingUser(email: string):Promise<string | null>{
        // const user = await this.dataSource.query<{isActiveAccount: boolean, id: string}[]>(`
        // select u."isActiveAccount",u."id" from public."Users" u
        // where u."email" = $1;
        // `,[email])
        const user = await this.usersRepository
        .createQueryBuilder("u")
        .select(`"id",u."isActiveAccount"`)
        .where("u.email = :email",{email})
        .execute()
        if(user[0] && !user[0].isActiveAccount) return user[0].id
        return null
       }
    
}