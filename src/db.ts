import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { User1698858773796 } from "./migration/1698858773796-user"
import { Worker1698966212313 } from "./migration/1698966212313-worker"
import { Appointment1698967851480 } from "./migration/1698967851480-appointment"
import { worker } from "./models/worker"
import "dotenv/config"
import { Appointment } from "./models/appointments"




export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, worker, Appointment],
    migrations:[User1698858773796, 
                Worker1698966212313,
                Appointment1698967851480],
    synchronize: false,
    logging: false,
   })