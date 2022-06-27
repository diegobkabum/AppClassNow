import {MigrationInterface, QueryRunner, Table,TableForeignKey} from "typeorm";

export class UploadDocumentStudent1630945258284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( 
            new Table({
                name:"uploaddocumentstudents",
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
                        name:"id_student",
                        type:"varchar",
                        length:"36"
                    },
                    {
                        name:"type_document",
                        type:"varchar",
                        length:"80"
                    },
                    {
                        name:"name_file",
                        type:"varchar",
                        length:"255"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
            })
        );

        await queryRunner.createForeignKey("uploaddocumentstudents", new TableForeignKey({
            columnNames: ["id_user"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("uploaddocumentstudents", new TableForeignKey({
            columnNames: ["id_student"],
            referencedColumnNames: ["id"],
            referencedTableName: "students",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("uploaddocumentstudents");
    }
}
