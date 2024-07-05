import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, SortDirection, UpdateDateColumn } from "typeorm";




@Entity()
export class Questions {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    body: string

    @Column({type: "json"})
    correctAnswers: Array<string>

    @Column({default: false})
    published: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
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

