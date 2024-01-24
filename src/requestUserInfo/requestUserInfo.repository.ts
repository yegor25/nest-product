import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { UserRequestInfo, requestUserInfoType } from "./requestUserInfo.schema"
import { Model } from "mongoose"


@Injectable()
export class RequestUserInfoRepository {
    constructor(
        @InjectModel(UserRequestInfo.name) private requestUserInfoModel: Model<UserRequestInfo>
    ){}
    async saveRequest(data: requestUserInfoType):Promise<requestUserInfoType>{
        const res = await this.requestUserInfoModel.create(data)
        return data
    }

    async countLastRequet(url: string, ip: string):Promise<number>{
        const filterDate = new Date(Date.now() - 10000)
        const count = await this.requestUserInfoModel.countDocuments({URL: url, IP: ip, date: {$gte: new Date(filterDate)}})
        return count
    }
}

