import { Injectable } from "@nestjs/common";
import { TokenRepository } from "./token.repository";



@Injectable()
export class TokenService {
    constructor(
        private tokenRepository: TokenRepository
    ){}

    async save(userId: string, token: string){
        return this.tokenRepository.save(token, userId)
    }

    async find(userId: string, token: string):Promise<boolean>{
        return this.tokenRepository.findTokenByUserId(userId, token)
    }
}