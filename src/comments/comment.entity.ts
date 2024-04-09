import { Users } from "../users/entities/user.entity";
import { Post } from "../posts/post.entity";
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommentLikes } from "../commentsLikes/commentLike.entity";

@Entity()
export class Comments {
  @PrimaryColumn()
  @Generated("uuid")
  id: string;

  @Column()
  content: string;

  @Column()
  createdAt: string;

  @Column()
  postId: string;

  @Column({onUpdate: "CASCADE"})
  userId: string;

  @OneToMany(() => CommentLikes, (cl) => cl.comment)
  likes: CommentLikes[];

  @ManyToOne(() => Post, (p) => p.comments)
  @JoinColumn()
  post: Post;

  @ManyToOne(() => Users, (u) => u.comments, {onDelete: "CASCADE",onUpdate: "CASCADE"})
  @JoinColumn()
  user: Users;
}
