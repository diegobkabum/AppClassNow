import { Entity, 
    Column,         
    PrimaryColumn, 
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("students")
export class Student {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    readonly id_user: string;

    @Column()
    first_name: string;
    
    @Column()
    last_name: string;

    @UpdateDateColumn()
    birth_date: Date;

    @Column()
    age: number;

    @Column()
    RG: string;

    @Column()
    CPF: string;

    @Column()
    class_student: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
