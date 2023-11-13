import {Router} from "express";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";
import { register, workerAppointments } from "../controllers/workerControllers";





const router = Router()

// router.post('/registerworker', auth, admin, register)
router.post('/registerworker', register)
// router.get('/appointments',auth, admin, workerAppointments)
router.get('/appointments', workerAppointments)




export {router}