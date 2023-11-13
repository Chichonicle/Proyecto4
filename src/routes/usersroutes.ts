import {Router} from "express";
import { login, register, profile, updateUser, deleteUserById, getUsers, myAppointments, changeRole, getWorkers } from "../controllers/userControllers";
import { auth } from "../middleware/auth";
import { isSuperAdmin } from "../middleware/isSuperAdmin";


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', profile)
// router.get('/profile', auth, profile)
router.put('/update', updateUser)
// router.put('/update', auth, updateUser)
router.delete('/delete', deleteUserById)
// router.delete('/delete',auth, isSuperAdmin, deleteUserById)
router.get('/all', getUsers)
// router.get('/all',auth, isSuperAdmin, getUsers)
router.get('/appointments', myAppointments)
// router.get('/appointments',auth, myAppointments)
router.put('/changerole', changeRole)
// router.put('/changerole', auth, isSuperAdmin, changeRole)
router.get('/allworkers', getWorkers)


export {router}