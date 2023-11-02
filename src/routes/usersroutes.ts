import {Router} from "express";
import { login, register, profile, updateUser, deleteUserById } from "../controllers/userControllers";
import { auth } from "../middleware/auth";
import { isSuperAdmin } from "../models/isSuperAdmin";


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', auth, profile)
router.put('/update', auth, updateUser)
router.delete('/delete',auth, isSuperAdmin, deleteUserById)

export {router}