import { Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ConfirmationData } from "./confirmationData";
import { SecurityDevices } from "../../securityDevices/securityDevices.entity";
import { Tokens } from "../../tokens/token.entity";
import { Blog } from "../../blogs/blog.entity";
import { Comments } from "../../comments/comment.entity";
import { PostLikes } from "../../postLikes/postLike.entity";


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

    @OneToOne(() => ConfirmationData, c => c.user, {onDelete: "RESTRICT"})
    confirmationData: ConfirmationData

    @OneToMany(() => SecurityDevices, s => s.user,{onDelete: "RESTRICT"})
    securityDevices: SecurityDevices[]

    @OneToMany(() => Tokens, t => t.user)
    tokens: Tokens[]

    @OneToMany(() => Blog, b => b.user)
    blogs: Blog[]

    @OneToMany(() => Comments, c => c.user)
    comments: Comments[]

    @OneToMany(() => PostLikes, pl => pl.user)
    postLikes: PostLikes[]
}


