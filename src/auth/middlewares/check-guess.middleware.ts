
import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express'
import { jwtConstants } from '../constants';

@Injectable()
export class CheckGuess implements NestMiddleware {
    constructor(
        public jwtService: JwtService
    ){

    }
  async  use(req: Request, res: Response, next: NextFunction) {
    if(!req.headers.authorization){
        req.query.userId = ""
        next();
    } else {
        const token =  req.headers.authorization
        const payload = token.split(" ")[1] 
        try {
            const data = await this.jwtService.verify(payload)
            if(data) req.query.userId = data.sub
            next()
        } catch (error) {
            req.query.userId = ""
            next()
        }
       
    }
  
     }
   }
