import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Appointment1698967851480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "appointments",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "title",
                type: "varchar",
                length: "255",
              },
              {
                name: "description",
                type: "varchar",
                length: "255",
              },
    
              {
                name: "worker",
                type: "int",
                
              },
    
              {
                name: "client",
                type: "int",
                
              },
              {
                name: "appointment_date",
                type: "varchar",
              },
              {
                name: "appointment_turn",
                type: "enum",
                enum: ["morning", "evening"],
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
                onUpdate: "CURRENT_TIMESTAMP",
              },
            ],
            foreignKeys: [
              {
                columnNames: ["worker"],
                referencedTableName: "worker",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
              },
              {
                columnNames: ["client"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
              },
            ],
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
      }
    }
    
