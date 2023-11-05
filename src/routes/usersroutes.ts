import {Router} from "express";
import { login, register, profile, updateUser, deleteUserById, getUsers, myAppointments, changeRole } from "../controllers/userControllers";
import { auth } from "../middleware/auth";
import { isSuperAdmin } from "../middleware/isSuperAdmin";


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', auth, profile)
router.put('/update', auth, updateUser)
router.delete('/delete',auth, isSuperAdmin, deleteUserById)
router.get('/all',auth, isSuperAdmin, getUsers)
router.get('/appointments',auth, myAppointments)
router.put('/changerole', auth, isSuperAdmin, changeRole)


export {router}