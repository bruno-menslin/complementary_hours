import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Certificate {

  @PrimaryGeneratedColumn()
  code: number

  @Column()
  title: string

  @Column()
  hours: number

  @Column()
  image: string

  @Column({ nullable: true })
  valid_hours: number

  @Column()
  situation: string

  @ManyToOne(() => User, (user) => user.certificates)
  user: User

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
