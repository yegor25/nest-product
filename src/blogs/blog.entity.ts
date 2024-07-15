import { Post } from "../posts/post.entity";
import { Users } from "../users/entities/user.entity";
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Blog {
  @PrimaryColumn({type: "uuid"})
  @Generated("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Column()
  websiteUrl: string;

  @Column({
    default: false,
  })
  isMembership: boolean;

  @OneToMany(() => Post, p => p.blog)
  posts: Post[]

  @ManyToOne(() => Users, (u) => u.blogs)
  @JoinColumn({name :"userId"})
  user: Users;

 
}
