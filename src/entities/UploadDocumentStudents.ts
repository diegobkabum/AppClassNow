import { Entity, 
    Column,         
    PrimaryColumn, 
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("uploaddocumentstudents")
export class UploadDocumentStudents {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    readonly id_user: string;
    
    @Column()
    readonly id_student: string;

    @Column()
    type_document: string;
    
    @Column()
    name_file: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
