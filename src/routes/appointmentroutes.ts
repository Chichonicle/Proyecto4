import { Router } from "express";
import { auth } from "../middleware/auth";
import { create, deleteAppointment, update } from "../controllers/appointmentControllers";

const router = Router()


router.post('/create', create)
// router.post('/create',auth, create)
router.post('/update', update)
// router.post('/update',auth, update)
router.delete('/delete', deleteAppointment)
// router.delete('/delete',auth, deleteAppointment)



export { router }