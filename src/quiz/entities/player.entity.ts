import { Users } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answers } from "./answer.entity";
import { Game } from "./game.entity";


@Entity()
export class Player {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({default: 0})
    score: number

    @Column({type: "uuid"})
    userId: string

    @ManyToOne(() => Users, u => u.players, {onDelete: "CASCADE"})
    user: Users

    @OneToMany(() => Answers, a => a.player)
    answers: Answers[]

    @OneToMany(() => Game, g => g )
    // @JoinColumn({})
    game: Game
    
}