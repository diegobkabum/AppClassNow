import { Entity, 
    Column,         
    PrimaryColumn, 
    CreateDateColumn
} from "typeorm";
import { v4 as uuid} from "uuid";


@Entity()
class Company {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    corporate_name: string;

    @Column()
    fantasy_name: string;
    
    @Column()
    CNPJ: string;

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
    email_contact: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Company };
