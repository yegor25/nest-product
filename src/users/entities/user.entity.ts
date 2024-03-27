import { Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ConfirmationData } from "./confirmationData";
import { SecurityDevices } from "../../securityDevices/securityDevices.entity";


@Entity()
export class Users {
    @PrimaryColumn({type: "uuid"})
    @Generated("uuid") id: string;

    @Column()
    email: string;

    @Column()
    login: string;

    @Column()
    createdAt: string;

    @Column()
    passwordSalt: string;

    @Column()
    passwordHash: string;

    @Column({default: false})
    isActiveAccount: boolean;

    @OneToOne(() => ConfirmationData, c => c.user)
    confirmationData: ConfirmationData

    @OneToMany(() => SecurityDevices, s => s.user)
    securityDevices: SecurityDevices[]


    
}


