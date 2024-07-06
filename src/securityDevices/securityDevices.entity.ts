import { Users } from "../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class SecurityDevices {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    userId: string

    @Column()
    ip: string
    @Column()
    title: string
    @Column()
    lastActiveDate: string
    @Column()
    deviceId: string
    @Column()
    isActive: boolean

    @ManyToOne(() => Users, u => u.securityDevices, {onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    user: Users
    
}