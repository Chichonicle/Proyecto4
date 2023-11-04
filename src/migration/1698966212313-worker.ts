import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Worker1698966212313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "worker",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {name: "user_id",
              type: "int"

              },
              {
                name: "username",
                type: "varchar",
                length: "255",
              },
              {
                name: "email",
                type: "varchar",
                length: "255",
                isUnique: true,
              },
              {
                name: "password",
                type: "varchar",
                length: "255",
              },
              {
                name: "role",
                type: "enum",
                enum: ["user", "admin", "super_admin"],
                default: '"admin"',
              },
              {
                name: "licenseNumber",
                type: "varchar",
                length: "255",
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
              
            ]
            ,
            foreignKeys: [
              {
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
              },
            ]
            
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("worker");
      }
    }
