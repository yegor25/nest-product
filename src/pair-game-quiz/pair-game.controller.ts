import { Controller, ForbiddenException, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtAuthGuard } from "../auth/guards/jwt-auth-guard";
import { PairGameService } from "./pair-game.service";
import { PairGameRepository } from "./pair-game.repository";


@Controller("pair-game-quiz/pairs")
export class PairGameQuizController {
    constructor(
        protected pairGameService: PairGameService,
        protected pairGameRepo: PairGameRepository
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

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getById(@Param("id") param: {id: string} ,@Req() req: {user: {userId: string}}, @Res() res: Response){
        const userId = req.user.userId
        const game = await this.pairGameRepo.checkYourPair(param.id)
        if(!game){
            res.sendStatus(404)
            return
        }
        if(game.firstPlayerProgress.userId !== userId || game.secondPlayerProgress.userId !== userId ){
            res.sendStatus(403)
            return
        }
        res.sendStatus(204)
    }
}