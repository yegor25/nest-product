import { Comments } from "../comments/comment.entity";
import { Blog } from "../blogs/blog.entity";
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { PostLikes } from "../postLikes/postLike.entity";

@Entity({ name: "posts" })
export class Post {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  shortDescription: string;

  @Column()
  content: string;

  @Column()
  blogName: string;

  @Column()
  createdAt: string;

  @Column()
  blogId: string;

  @ManyToOne(() => Blog, (b) => b.posts)
  blog: Blog[];
  
  @OneToMany(() => Comments, (c) => c.post)
  comments: Comments[];

  @OneToMany(() => PostLikes, (pl) => pl.post)
  postLikes: PostLikes[];
}
