import { Request, Response } from "express"
import { worker } from "../models/worker"
import bcrypt from "bcrypt"
import { User } from "../models/User"



const register = async (req: Request, res: Response) => {
    try {
      const user_id = req.body.user_id;
      const username = req.body.username;
      const email = req.body.email;
      const role = req.body.role;
      const password = req.body.password;
      const licenseNumber = req.body.licenseNumber;
  
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.json({ mensaje: 'Correo electrónico no válido' })
      }
  
      const encryptedPassword = bcrypt.hashSync(password, 10)

      const updateworker = await User.findOneBy({
        email: email,
      });
  
      await User.update(
        { id: updateworker!.id },
        { role: "admin" }
      );

      const newWorker = await worker.create({
        user_id: user_id,
        username: username,
        email: email,
        role: role,
        password: encryptedPassword,
        licenseNumber: licenseNumber,

      }).save();
      return res.json({
        success: true,
        message: "Worker created succesfully",
        token: newWorker
      }
      )
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Worker cannot be created",
        error: error
      })
    }
  }


  export {register}