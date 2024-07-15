import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm"
import { Users } from "./user.entity"

@Entity()
export class ConfirmationData {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    userId: string

    @Column()
    code: string

    @Column()
    expirationDate: Date

   

    @OneToOne( () => Users, u => u.confirmationData)
    @JoinColumn({name:"userId"})
    user: Users
}