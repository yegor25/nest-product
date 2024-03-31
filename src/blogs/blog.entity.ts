import { Users } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Blog {
  @PrimaryColumn({ type: "uuid" })
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

  @ManyToOne(() => Users, (u) => u.blogs)
  @JoinColumn()
  user: Users;
}
