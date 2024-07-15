import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, SortDirection, UpdateDateColumn } from "typeorm";
import { GameQuestion } from "./entities/gamePlayer.entity";




@Entity({name: "Questions"})
export class Questions {
    @PrimaryColumn()
    @Generated("uuid")
    id: string

    @Column()
    body: string

    @Column({type: "json"})
    correctAnswers: Array<string>

    @Column({default: false})
    published: boolean

    @CreateDateColumn()
    createdAt: Date

    @Column({nullable: true, type: "timestamp",default: null})
    updatedAt: Date | null

   @ManyToOne(() => GameQuestion,gm => gm.question)
   gameQuestion: GameQuestion

}


export enum PublishedStatus {
    all = "all",
    published = "published",
    notPublished = "notPublished"
}
export class CreatedQuestions {
    @MaxLength(500)
    @MinLength(10)
    body: string
    
    @IsArray()
    @IsString({each: true})
    @IsNotEmpty({each: true})
    correctAnswers:Array<string>
}

export type paramsQuestionsPaginatorType = {
    pageNumber: string;
    pageSize: string;
    bodySearchTerm: string;
    sortBy: keyof Questions;
    sortDirection: SortDirection;
}

