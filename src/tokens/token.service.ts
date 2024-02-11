import { Injectable } from "@nestjs/common";
import { TokenRepository } from "./token.repository";
import { TokenSqlRepository } from "./tokenSql.repository";



@Injectable()
export class TokenService {
    constructor(
        private tokenRepository: TokenRepository,
        private tokenSqlRepository: TokenSqlRepository
    ){}

    async save(userId: string, token: string){
        return this.tokenSqlRepository.save(token, userId)
    }

    async find(userId: string, token: string):Promise<boolean>{
        return this.tokenSqlRepository.findTokenByUserId(userId, token)
    }
}