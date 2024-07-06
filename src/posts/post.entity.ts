import { Comments } from "../comments/comment.entity";
import { Blog } from "../blogs/blog.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { PostLikes } from "../postLikes/postLike.entity";


@Entity({name: "posts"})
export class Post {
    @PrimaryColumn()
    @Generated("uuid")
    id: string

    @Column()
    title: string

    @Column()
    shortDescription: string

    @Column()
    content: string

    @Column()
    blogName: string

    @Column()
    createdAt: string

    @Column()
    blogId: string

    @OneToMany(() => Comments, c => c.post)
    comments: Comments[]

    @ManyToOne(() => Blog, b => b.posts, {onDelete:"CASCADE"})
    @JoinColumn({name: "blogId"})
    blog: Blog

    @OneToMany(() => PostLikes, pl => pl.post)
    postLikes: PostLikes[]

    
}

