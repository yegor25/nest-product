import { Controller, ForbiddenException, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth-guard";
import { PairGameService } from "./pair-game.service";


@Controller("pair-game-quiz/pairs")
export class PairGameQuizController {
    constructor(
        protected pairGameService: PairGameService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post("connection")
    async createGame(@Req() req: {user: {userId: string}}, @Res() res: Response){
        const userId = req.user.userId
        const newGame = await this.pairGameService.createGame(userId)
       if(!newGame){
        throw new ForbiddenException();
       }
       res.send(newGame)
    }
}