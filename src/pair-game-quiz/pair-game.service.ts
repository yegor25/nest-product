import { Injectable } from "@nestjs/common";
import { PairGameRepository } from "./pair-game.repository";
import { gameViewType } from "../quiz/entities/game.entity";
import { UserSqlRepository } from "../users/userSql.repository";
import { pairGameHelper } from "./pair-game.helper";

@Injectable()
export class PairGameService {
  constructor(protected pairGameRepo: PairGameRepository, protected userRepo: UserSqlRepository) {}

  async createGame(userId: string): Promise<gameViewType | null | boolean> {
    const existUserInGame = await this.pairGameRepo.checkExistGameForUser();
          const ourUser = existUserInGame.find(
      (u) =>
        ((u.firstPlayerProgress && u.firstPlayerProgress.userId === userId )|| (u.secondPlayerProgress && u.secondPlayerProgress.userId === userId))
    );
    console.log("exist",existUserInGame)
    if (ourUser) {
      return null;
    }
    const freeGame = await this.pairGameRepo.checkFreeGame()
    if(freeGame){
      const newPlayer = await this.createNewPlayer(userId);
      const newGame = await this.pairGameRepo.addSecondPlayerToGame(
        userId,
        newPlayer
      );
      console.log("new",newGame)
      if (newGame.modCount === 1) {
        const {id,firstPlayerProgressId,secondPlayerProgressId, status, pairCreatedDate, startGameDate, finishGameDate,firstPlayerProgress,secondPlayerProgress } = newGame.player
        const firsUser = await this.userRepo.findById(firstPlayerProgress.player.userId)
        const secondUser = await this.userRepo.findById(secondPlayerProgress.player.userId)
      return {
        id,
        firstPlayerProgress: {
            answers: [],
            player: {
                id: firsUser!.id,
                login: firsUser!.login
            },
            score: firstPlayerProgress.score
        },
        secondPlayerProgress: {
            answers: [],
            player: {
                id: secondUser!.id,
                login: secondUser!.login
            },
            score: secondPlayerProgress.score
        },
        status: status,
        pairCreatedDate,
        startGameDate,
        finishGameDate,
        questions: []
      };
    }
    return null
    }
   
     else {
      const newPlayer = await this.createNewPlayer(userId);
      const newPairs = await this.pairGameRepo.createNewPairs(
        userId,
        newPlayer
      );
      const firstUser = await this.userRepo.findById(userId)
     if(!firstUser) return null
     console.log("log")
      return pairGameHelper.mapperGameForView(newPairs,firstUser,null, newPlayer,null, null)
    }
  }

  async createNewPlayer(userId: string) {
    return this.pairGameRepo.createNewPlayer(userId);
  }
}
