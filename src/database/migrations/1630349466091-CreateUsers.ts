import {MigrationInterface, QueryRunner, Table, Unique} from "typeorm";

export class CreateUsers1630349466091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users",
                columns:[
                    {
                        name:"id",
                        type:"varchar(36)",
                        isPrimary:true                        
                    },
                    {
                        name:"firstName",
                        type:"varchar"
                    },
                    {
                        name:"lastName",
                        type:"varchar"
                    },
                    {
                        name:"email",
                        type:"varchar"
                    },
                    {
                        name:"admin",
                        type:"boolean",
                        default:false
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
