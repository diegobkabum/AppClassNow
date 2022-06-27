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
    first_name: string;
    
    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    address_number: string;

    @Column()
    district: string;

    @Column()
    complement: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    CEP: string;

    @Column()
    phone_contact: string;

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
