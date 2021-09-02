import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateStudent1630521737051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"students",
                columns: [
                    {
                        name:"id",
                        type:"varchar",
                        length:"36",
                        isPrimary: true
                    },
                    {
                        name:"id_user",
                        type:"varchar",
                        length:"36"
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
                        name:"birth_date",
                        type:"timestamp"
                    },
                    {
                        name:"age",
                        type:"int"
                    },
                    {
                        name:"RG",
                        type:"varchar",
                        length: "9"
                    },
                    {
                        name:"CPF",
                        type:"varchar",
                        length: "11"
                    },
                    {
                        name:"class_student",
                        type:"varchar",
                        length:"120"
                    },                    
                ],
            })
        );

        await queryRunner.createForeignKey("students", new TableForeignKey({
            columnNames: ["id_user"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("students");
    }

}
