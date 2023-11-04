import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Proyects1699137678202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "proyects",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "proyectName",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "worker_id",
                        type: "int"
                    },
                    {
                        name: "tattooname",
                        type: "varchar",
                      },
                      {
                        name: "tattoo_url",
                        type: "varchar",
                      },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",                        
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"                 
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["worker_id"],
                        referencedTableName: "worker",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("proyects");
    }

}