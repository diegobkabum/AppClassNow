import { Entity, 
         Column,         
         PrimaryColumn, 
         CreateDateColumn
} from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };
