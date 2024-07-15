import { Users } from "../users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

export type tokenDbType = {
    token: string
}


@Entity()
export class Tokens {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    token: string

    @Column()
    userId: string

    @ManyToOne(() => Users, u => u.tokens)
    @JoinColumn({name: "userId"})
    user: Users
}