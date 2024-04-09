import { Post } from "../posts/post.entity";
import { Users } from "../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LikeStatus } from "./like.schema";


@Entity({name: "PostLikes"})
export class PostLikes {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    userId: string

    @Column()
    addedAt: string

    @Column()
    login: string

    @Column()
    status: LikeStatus

    @Column()
    postId: string

    @ManyToOne(() => Users, u => u)
    @JoinColumn()
    user: Users

    @ManyToOne(() => Post, p => p.postLikes)
    @JoinColumn()
    post: Post
}