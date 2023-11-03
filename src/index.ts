import express from "express";
import {router as routerUsers} from "./routes/usersroutes";
import { AppDataSource } from "./db";

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.use('/users', routerUsers)

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
