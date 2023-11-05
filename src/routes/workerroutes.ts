import {Router} from "express";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";
import { register, workerAppointments } from "../controllers/workerControllers";





const router = Router()

router.post('/registerworker', auth, admin, register)
router.get('/appointments',auth, workerAppointments)




export {router}