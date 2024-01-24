import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "crypto";
import { NextFunction, Request, Response } from "express";
import { jwtConstants } from "../constants";
import { UserService } from "src/users/user.service";
import { TokenService } from "src/tokens/token.service";



@Injectable()
export class CheckRefreshToken implements NestMiddleware {
    constructor(
        public jwtService: JwtService,
        private userService:UserService,
        protected tokenService:TokenService
    ){}

    async use(req:Request, res:Response, next: NextFunction){
        
        const token = req.cookies.refreshToken
        if(!token){
            res.sendStatus(401)
            return
        }
        try {
            const data = await this.jwtService.verify(token,{secret: jwtConstants.refreshSecret})
            if(data){
                const user =  await this.userService.findById(data.sub)
                if(!user){
                    res.sendStatus(401)
                    return
                }
                const blackToken = await this.tokenService.find(user._id.toString(), token)
                if(blackToken){
                    res.sendStatus(401)
                    return
                }
                req.body.user = user
                req.body.deviceId = data.deviceId
               return next()
            } else {
                res.sendStatus(401)
                return
            }
        } catch (error) {
            res.sendStatus(401)
            return
        }
    }
}