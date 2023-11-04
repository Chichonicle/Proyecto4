import express from "express";
import {router as routerUsers} from "./routes/usersroutes";
import { router as routerWorkers} from "./routes/workerroutes";
import { AppDataSource } from "./db";

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000

app.use('/users', routerUsers)
app.use('/workers', routerWorkers)

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        
    })
    .catch(error => {
        console.log(error);
    })

app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
})
