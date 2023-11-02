import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { User1698858773796 } from "./migration/1698858773796-user"



export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    migrations:[User1698858773796],
    synchronize: false,
    logging: false,
   })