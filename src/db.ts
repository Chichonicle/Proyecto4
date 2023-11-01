import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { User1698858773796 } from "./migration/1698858773796-user"



export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "proyecto4",
    entities: [User],
    migrations:[User1698858773796],
    synchronize: false,
    logging: false,
   })