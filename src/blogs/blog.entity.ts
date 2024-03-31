import { Users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Blog {
@PrimaryGeneratedColumn("uuid")
  id: string

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
    default: false
  })
  isMembership: boolean;

  @ManyToOne(() => Users, u => u.blogs)
  @JoinColumn()
  user: Users
}