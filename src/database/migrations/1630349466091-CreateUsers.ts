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
                        name:"first_name",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"last_name",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"email",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"username",
                        type:"varchar",
                        length: "80"
                    },
                    {
                        name:"password",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"address",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"address_number",
                        type:"varchar",
                        length: "6"
                    },
                    {
                        name:"district",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"complement",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"city",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"state",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"CEP",
                        type:"varchar",
                        length: "120"
                    },
                    {
                        name:"phone_contact",
                        type:"varchar",
                        length: "11"
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
