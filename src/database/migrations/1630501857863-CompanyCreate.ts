import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CompanyCreate1630501857863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "company",
                columns: [
                    {
                        name:"id",
                        type:"varchar",
                        length:"36",
                        isPrimary: true
                    },
                    {
                        name:"corporate_name",
                        type:"varchar",
                        length:"120"
                    },
                    {
                        name:"fantasy_name",
                        type:"varchar",
                        length:"80"
                    },
                    {
                        name:"CNPJ",
                        type:"varchar",
                        length:"14"
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
                        name:"email_contact",
                        type:"varchar",
                        length: "120"
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
        await queryRunner.dropTable("company");
    }

}
