import {Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";
import { v4 as uuid } from "uuid"

@Entity("password_recover_tokens")
class TokenToRecoverPassword {
    
    @PrimaryColumn()
    id: string

    @Column()
    user_id: string

    @JoinColumn({name: "user_id"})
    @OneToOne(() => User)
    userId: User

    @Column()
    token: string

    @Column()
    expire_at: Date

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }

}

export { TokenToRecoverPassword }
