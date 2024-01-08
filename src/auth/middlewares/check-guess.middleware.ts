
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
      const token =  req.headers.authorization
     if(!token) {
        req.query.userId = ""
      next();
     } else {
        const payload = token.split(" ")[1]
        const data = await this.jwtService.verify(payload)
       req.query.userId = data.sub
        next()
     }
   }
}