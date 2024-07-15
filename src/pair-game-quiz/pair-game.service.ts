import { Injectable } from "@nestjs/common";
import { PairGameRepository } from "./pair-game.repository";
import { gameViewType } from "../quiz/entities/game.entity";
import { UserSqlRepository } from "../users/userSql.repository";
import { pairGameHelper } from "./pair-game.helper";

@Injectable()
export class PairGameService {
  constructor(
    protected pairGameRepo: PairGameRepository,
    protected userRepo: UserSqlRepository
  ) {}

  async createGame(userId: string): Promise<gameViewType | null | boolean> {
    const existUserInGame = await this.pairGameRepo.checkExistGameForUser();
    const ourUser = existUserInGame.find(
      (u) =>
        (u.firstPlayerProgress && u.firstPlayerProgress.userId === userId) ||
        (u.secondPlayerProgress && u.secondPlayerProgress.userId === userId)
    );
    if (ourUser) {
      return null;
    }
    const freeGame = await this.pairGameRepo.checkFreeGame();
    if (freeGame) {
      const newPlayer = await this.createNewPlayer(userId);
      const newGame = await this.pairGameRepo.addSecondPlayerToGame(
        userId,
        newPlayer
      );
      if (newGame.modCount === 1) {
        console.log("newedxwecx", newGame.player)
        
        const game = await this.pairGameRepo.findGameByIdForNewGame(newGame.player.id)
        console.log("result",game)
        if(!game) return null
        const firsUser = await this.userRepo.findById(game!.firstPlayerProgress.userId)
       const secondUser = await this.userRepo.findById(game!.secondPlayerProgress.userId)
      return {
        id: game?.id,
        firstPlayerProgress: {
            answers: [],
            player: {
                id: firsUser!.id,
                login: firsUser!.login
            },
            score: game.firstPlayerProgress.score
        },
        secondPlayerProgress: {
            answers: [],
            player: {
                id: secondUser!.id,
                login: secondUser!.login
            },
            score: game.secondPlayerProgress.score
        },
        status: game.status,
        pairCreatedDate: game.pairCreatedDate,
        startGameDate: game.startGameDate,
        finishGameDate: game.finishGameDate,
        questions: []
      };
    }
    return null
    } else {
      const newPlayer = await this.createNewPlayer(userId);
      const newPairs = await this.pairGameRepo.createNewPairs(
        userId,
        newPlayer
      );
      const firstUser = await this.userRepo.findById(userId);
      if (!firstUser) return null;
      return pairGameHelper.mapperGameForView(
        newPairs,
        firstUser,
        null,
        newPlayer,
        null,
        null
      );
    }
    // if(freeGame){
    //   const newPlayer = await this.createNewPlayer(userId);
    //   const newGame = await this.pairGameRepo.addSecondPlayerToGame(
    //     userId,
    //     newPlayer
    //   );
    //   console.log("new",newGame)
    
    // }
  }

  async createNewPlayer(userId: string) {
    return this.pairGameRepo.createNewPlayer(userId);
  }
}
