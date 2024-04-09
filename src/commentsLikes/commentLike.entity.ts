import { Comments } from "../comments/comment.entity";
import { LikeStatus } from "../postLikes/like.schema";
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentLikes {
    @PrimaryColumn()
    @Generated("uuid")
    id: string

    @Column()
    createdAt: string

    @Column()
    status: LikeStatus

    @Column()
    userId: string

    @Column("uuid")
    commentId: string

    @ManyToOne(() => Comments, c => c.likes, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn()
    comment: Comments
}