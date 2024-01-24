import { Injectable, NestMiddleware } from "@nestjs/common";
import { RequestUserInfoRepository } from "../requestUserInfo.repository";
import { NextFunction, Request, Response } from "express";
import { RequestUserInfoService } from "../requestUserInfoService";


@Injectable()
export class RateLimiting implements NestMiddleware {
    constructor(
        protected requestUserInfoService: RequestUserInfoService
    ){}

    async use(req:Request,res:Response,next:NextFunction){
        const URL = req.originalUrl
        const IP = req.ip as string
        const date = new Date()
        await this.requestUserInfoService.create({URL, IP, date})
        const isAllowed = await this.requestUserInfoService.checkRateLimiting(URL, IP)
        if(!isAllowed){
            res.sendStatus(429)
            return
    } else {
        next()
    }
    }
}