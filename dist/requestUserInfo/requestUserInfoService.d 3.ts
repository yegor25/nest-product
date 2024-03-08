import { RequestUserInfoRepository } from "./requestUserInfo.repository";
import { requestUserInfoType } from "./requestUserInfo.schema";
export declare class RequestUserInfoService {
    protected requestUserInfoRepository: RequestUserInfoRepository;
    constructor(requestUserInfoRepository: RequestUserInfoRepository);
    create(data: requestUserInfoType): Promise<requestUserInfoType>;
    checkRateLimiting(url: string, ip: string): Promise<boolean>;
}
