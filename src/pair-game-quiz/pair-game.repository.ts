import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game, GameStatus, createdGameDbType } from "../quiz/entities/game.entity";
import { Not, Repository } from "typeorm";
import { Player } from "../quiz/entities/player.entity";


@Injectable()
export class PairGameRepository {
    constructor(
        @InjectRepository(Game) protected gameRepository: Repository<Game>,
        @InjectRepository(Player) protected playerRepo: Repository<Player>
    ){}

    async checkExistGameForUser():Promise<Game[]>{
        // const game = await this.gameRepository.createQueryBuilder("game")
        // .leftJoinAndSelect(`game."firstPlayerProgress"`,"firstPlayerProgress")
        // .leftJoinAndSelect(`game."secondPlayerProgress"`,"secondPlayerProgress")
        // .where(`game.status != :status`,{status: GameStatus.Finished})
        // .getMany()
        const game = await this.gameRepository.find({
            relations :{
                firstPlayerProgress: true,
                secondPlayerProgress: true
            },
            where: {
                status:(GameStatus.Active, GameStatus.PendingSecondPlayer)
            }
        })
        return game
    }
    

    async createNewPairs(userId: string, player: Player){
        const newGame = await this.gameRepository.createQueryBuilder()
        .insert()
        .into(Game)
        .values({
            firstPlayerProgress: player,
            firstPlayerProgressId: userId,
            // firstPlayerProgressId: player!.userId
            // firstPlayerProgressId: userId, 
            //firstPlayerProgress: player.id
            // firstPlayerProgress: () => userId
        })
        .returning("*")
        .execute()
        return newGame.raw[0] as createdGameDbType
    }

    async createNewPlayer(userId: string){
        const newPlayer = await this.playerRepo.createQueryBuilder()
        .insert()
        .into(Player)
        .values({userId})
        .returning("*")
        .execute()
        return newPlayer.raw[0] 
    }
    async addSecondPlayerToGame(userId: string, player: Player){
        const secondPlayer = await this.gameRepository.createQueryBuilder()
        .update(Game)
        .set({secondPlayerProgress: player, secondPlayerProgressId: userId, startGameDate: new Date().toISOString(), status: GameStatus.Active})
        .where("status = :status", {status: GameStatus.PendingSecondPlayer})
        .returning("*")
        .execute()
        return {player: secondPlayer.raw[0], modCount: secondPlayer.affected}
    }
    async checkFreeGame(){
        const game = await this.gameRepository.findOne({where: {status: GameStatus.PendingSecondPlayer}})
        if(game) return true
        return false
    }
    async findGameByIdForNewGame(id: string){
       const game = await this.gameRepository.findOne({
        relations: {
            firstPlayerProgress: true,
            secondPlayerProgress: true
        },
        where: {id},
        
       })
       return game

    }
    async checkYourPair( pairId: string){
        const game = await this.gameRepository.findOne({
            relations: {firstPlayerProgress: true, secondPlayerProgress: true},
            where: {id: pairId}
        })
        return game
    }
}