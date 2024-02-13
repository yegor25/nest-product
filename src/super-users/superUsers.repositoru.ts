import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateUserDtoType, CreatedUserDtoDbType, ResponseAllUserDto, SortDirection, paramsUserPaginatorType } from "../users/user.schema";
import { DataSource } from "typeorm";
import { userHelper } from "../users/user.helper";


@Injectable()
export class SuperUserRepository {
    constructor(
        @InjectDataSource() protected dataSourse:DataSource
    ){}
    async create(dto: CreatedUserDtoDbType):Promise<{id: string, createdAt: string}>{
        const user = await this.dataSourse.query<{id: string, createdAt: string}[]>(`
            insert into public."Users"
            ("email","login","passwordSalt","passwordHash","isActiveAccount","createdAt")
            values('${dto.email}','${dto.login}','${dto.passwordSalt}','${dto.hashPassword}','true','${new Date().toISOString()}')
            returning "id","createdAt"
        ;
        `)
        return {id: user[0].id, createdAt: user[0].createdAt}
    }

    async checkByEmail(email: string):Promise<boolean>{
        const user = await this.dataSourse.query(`
            SELECT * from public."Users" u
            WHERE u."email" = '${email}';
        `)
        
        if(user[0]) return true
        return false
    }
    async checkByLogin(login: string):Promise<boolean>{
        const user = await this.dataSourse.query(`
            SELECT * from public."Users" u
            WHERE u."login" = $1;
        `, [login])
        if(user[0]) return true
        return false
    }

    async deleteAll(){
        return this.dataSourse.query(`
        Truncate public."Users" Cascade;
        `)
    }

    async findById(id: string){
        const user = await this.dataSourse.query(`
            Select * from public."Users" u
            WHERE u."id" = $1;
        `,[id])
        return user[0]
    }

    async deleteUser(id: string){
        const user = await this.dataSourse.query(`
            Delete from public."Users" u
            WHERE u."id" = $1;
        `,[id])
        if(user[1] === 1) return true
        return false
    }
    async finddAll(params: paramsUserPaginatorType):Promise<ResponseAllUserDto>{
        const parametres = userHelper.usersParamsMapper(params);
        const skipCount = (+parametres.pageNumber - 1) * Number(parametres.pageSize);
        const loginTerm = params.searchLoginTerm ? params.searchLoginTerm : ''
        const emailTerm = params.searchEmailTerm ? params.searchEmailTerm : ''
        const sortDirection = params.sortDirection ? params.sortDirection : SortDirection.desc
        const queryTotalCountString = `
            select count(*)
            from public."Users" u
            where u."login" ilike '%${loginTerm}%' OR u."email" ilike '%${emailTerm}%';
        `
        const queryUserString = `
            select u."email",u."login",u."id",u."createdAt"
            from public."Users" u
            where u."login" ilike '%${loginTerm}%' OR u."email" ilike '%${emailTerm}%'
            order by u."${parametres.sortBy}" ${sortDirection}
            limit ${+parametres.pageSize} offset ${skipCount}
            ;
        `
        const totalCount = await this.dataSourse.query<{count: string}[]>(queryTotalCountString)
        const users = await this.dataSourse.query(queryUserString)
        const result:ResponseAllUserDto = {
            pagesCount: Math.ceil(+totalCount[0].count / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount: +totalCount[0].count, 
            items: users
        }
        return result
    }
    
}