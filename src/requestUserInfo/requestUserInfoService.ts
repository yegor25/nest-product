import { Injectable } from "@nestjs/common";
import { RequestUserInfoRepository } from "./requestUserInfo.repository";
import { requestUserInfoType } from "./requestUserInfo.schema";


@Injectable()
export class RequestUserInfoService {
    constructor(
        protected requestUserInfoRepository:RequestUserInfoRepository
    ){}

    async create(data:requestUserInfoType){
        return this.requestUserInfoRepository.saveRequest(data)
    }

    async checkRateLimiting(url: string, ip: string):Promise<boolean>{
        const count = await this.requestUserInfoRepository.countLastRequet(url,ip)
        if(!count || count < 5) return true
        return false
    }
}