import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt"


const register = async (req: Request, res: Response) => {
    try {
   
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password
  
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
      if (!emailRegex.test(email)) {
        return res.json({ mensaje: 'Correo electrónico no válido' });
      }
      const encryptedPassword = bcrypt.hashSync(password, 10)

    const newUser = await User.create({
      username: username,
      email: email,
      password: encryptedPassword
    }).save()

    return res.json({
      success: true,
      message: "User created succesfully",
      token: newUser
    })
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "user cant be created",
        error: error
      }
    )
  }
}

export {register}