import {Router} from "express";
import { login, register, profile } from "../controllers/userControllers";
import { auth } from "../middleware/auth";


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', auth, profile)



export {router}