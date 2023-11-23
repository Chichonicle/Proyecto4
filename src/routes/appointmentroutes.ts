import { Router } from "express";
import { auth } from "../middleware/auth";
import { create, deleteAppointment, update } from "../controllers/appointmentControllers";
import { isSuperAdmin } from "../middleware/isSuperAdmin";
import { allAppointments } from "../controllers/userControllers";

const router = Router()


router.post('/create',auth, create)
router.post('/update',auth, update)
router.delete('/delete',auth, deleteAppointment)

router.get('/all', auth, isSuperAdmin, allAppointments)



export { router }