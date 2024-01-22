import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "crypto";
import { NextFunction, Request, Response } from "express";
import { jwtConstants } from "../constants";
import { UserService } from "src/users/user.service";



@Injectable()
export class CheckRefreshToken implements NestMiddleware {
    constructor(
        public jwtService: JwtService,
        private userService:UserService
    ){}

    async use(req:Request, res:Response, next: NextFunction){
        console.log("ref",req.cookies)
        
        const token = req.cookies.refreshToken
        if(!token){
            res.sendStatus(401)
            return
        }
        try {
            const data = await this.jwtService.verify(token,{secret: jwtConstants.refreshSecret})
            if(data){
                const user =  await this.userService.findById(data.sub)
                req.body.user = user
                // req.body.deviceId = isValid.deviceId
                next()
            } else {
                throw new UnauthorizedException();
            }
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}