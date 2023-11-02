import {Router} from "express";
import { login, register, profile, updateUser } from "../controllers/userControllers";
import { auth } from "../middleware/auth";


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', auth, profile)
router.put('/update/', auth, updateUser)


export {router}