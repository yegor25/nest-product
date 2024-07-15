import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./game.entity";
import { Questions } from "../quiz.entity";



@Entity({name: "game_question"})
export class GameQuestion {
    @PrimaryGeneratedColumn('increment')
    public id: number;
 
    @OneToMany(() => Questions, q => q.gameQuestion)
    // @Column()
    @JoinColumn({name: "questionId"})
    question: Questions[]
 
    @OneToMany(() => Game, g => g.gameQuestion)
    // @Column()
    game: Game[] 
 
    @Column()
    order: number;

    

}