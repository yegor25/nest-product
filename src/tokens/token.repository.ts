import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tokens } from "./token.schema";
import { Model } from "mongoose";


@Injectable()
export class TokenRepository{
    constructor(
        @InjectModel(Tokens.name) private tokensModel: Model<Tokens>
    ){}

    async save(token: string, userId: string){
        const newToken = new this.tokensModel({userId, token})
        await newToken.save()
        return
    }

    async findTokenByUserId(userId: string, token: string):Promise<boolean>{
        const query = await this.tokensModel.findOne({userId, token})
        if(query) return true
        return false
    }
}