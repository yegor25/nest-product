import { Injectable } from "@nestjs/common";
import { SuperUserRepository } from "./superUsers.repositoru";
import { CreateUserDtoType, CreatedUserDtoDbType, ResponseUserDtoType, paramsUserPaginatorType } from "../users/user.schema";
import { cryptoService } from "../common/crypto.service";
import { CreateSuDtoType } from "./su.schema";




@Injectable()
export class SuperUsersService {
    constructor(
        protected superUserRepository: SuperUserRepository
    ){}
    async create(dto: CreateSuDtoType):Promise<ResponseUserDtoType>{
        const hash = await cryptoService.genHash(dto.password)
        const dbDto:CreatedUserDtoDbType = {
            email: dto.email,
            login: dto.login,
            passwordSalt: hash.salt,
            hashPassword: hash.hash
        }
         const newUser = await this.superUserRepository.create(dbDto)
         return {
            email: dto.email,
            login: dto.login,
            id: newUser.id,
            createdAt: newUser.createdAt
         }
    }

    async checkEmail(email: string):Promise<boolean>{
        return this.superUserRepository.checkByEmail(email)
    }

    async checkLogin(login: string):Promise<boolean>{
        return this.superUserRepository.checkByLogin(login)
    }
    async findById(id: string){
        return this.superUserRepository.findById(id)
    }
    async deleteUser(id: string){
        return this.superUserRepository.deleteUser(id)
    }
    async deleteAll(){
        return this.superUserRepository.deleteAll()
    }
    async findAll(params: paramsUserPaginatorType){
        return this.superUserRepository.finddAll(params)
    }
}