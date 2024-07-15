import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player.entity";
import { AnswerStatus } from "./answer.entity";
import { GameQuestion } from "./gamePlayer.entity";


export enum GameStatus {
    PendingSecondPlayer = "PendingSecondPlayer",
    Active = "Active",
    Finished = "Finished",
  }

@Entity()
export class Game {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid"})
  firstPlayerProgressId: string;

  @Column({ type: "uuid", nullable: true })
  secondPlayerProgressId: string;

  @Column({type: "enum",enum: GameStatus,default: GameStatus.PendingSecondPlayer})
  status: GameStatus;

  @Column({ default: new Date().toISOString() })
  pairCreatedDate: string;

  @Column({ nullable: true, default: null })
  startGameDate: string;

  @Column({ nullable: true, default: null })
  finishGameDate: string;

  @ManyToOne(() => Player, (p) => p.game, {onDelete: "CASCADE"})
//   @JoinColumn({name: "firstPlayerProgressId", referencedColumnName: "id"})
  firstPlayerProgress: Player;

  @ManyToOne(() => Player, (p) => p.game, {nullable: true, onDelete: "CASCADE"})
  secondPlayerProgress: Player;

  @ManyToOne(() => GameQuestion, gm => gm.game)
  gameQuestion: GameQuestion
}

export type gameViewType = {
  id: string;
  firstPlayerProgress: {
    answers: answersViewType[];
    player: playerViewType,
    score: number;
  };
  secondPlayerProgress: {
    answers: answersViewType[];
    player: playerViewType;
    score: number;
  } | null;
  questions: questionsViewType[] | null;
  status: GameStatus;
  pairCreatedDate: string;
  startGameDate: string | null;
  finishGameDate: string | null;
};

export type answersViewType = {
  questionId: string;
  answerStatus: AnswerStatus;
  addedAt: string;
};
export type playerViewType = {
    id: string,
    login: string
}
export type questionsViewType = {
    id: string;
    body: string;
}

export type createdGameDbType = {
    id: string,
  firstPlayerProgressId: string,
  secondPlayerProgressId: string | null,
  pairCreatedDate: string,
  startGameDate: string |  null,
  finishGameDate: string | null,
  gameQuestionId: string | null,
  status: GameStatus
}

