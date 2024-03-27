import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm"
import { Users } from "./user.entity"

@Entity()
export class ConfirmationData {
    // @PrimaryGeneratedColumn("uuid")
    // id: string

    @PrimaryColumn()
    userId: string

    @Column()
    code: string

    @Column()
    expirationDate: Date

   

    @OneToOne( () => Users, u => u.confirmationData)
    @JoinColumn()
    user: Users
}