import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player.entity";


export enum AnswerStatus {
    Correct = "Correct",
    Incorrect = "Incorrect"
}
@Entity()
export class Answers {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "enum",enum: AnswerStatus})
    status: AnswerStatus

    @Column({type: "uuid"})
    questionId: string

    @Column({default: new Date().toISOString()})
    addedAt: string

    @ManyToOne(() => Player, p => p.answers)
    player: Player
}


