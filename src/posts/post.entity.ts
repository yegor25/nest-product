import { Blog } from "../blogs/blog.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";


@Entity()
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

    @ManyToOne(() => Blog, b => b.posts)
    @JoinColumn()
    blog: Blog
}

