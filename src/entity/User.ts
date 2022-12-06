import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Certificate } from "./Certificate"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column()
    role: string

    @Column()
    status: string

    @OneToMany(() => Certificate, (certificate) => certificate.user)
    certificates: Certificate[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
