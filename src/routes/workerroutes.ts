import {Router} from "express";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";
import { register } from "../controllers/workerControllers";




const router = Router()

router.post('/registerworker', auth, admin, register)




export {router}