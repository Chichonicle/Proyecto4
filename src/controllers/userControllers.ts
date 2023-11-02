import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
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

const login = async (req: Request, res: Response) => {
  try {
      const email = req.body.email
      const password = req.body.password
      const user = await User.findOneBy({
          email: email
      })
      if (!user) {
          return res.json( {
              success: true,
              message: "User on password incorrect", 
          })
      }
      if (!bcrypt.compareSync(password, user.password)) {
          return res.json( {
              success: true,
              message: "User on password incorrect", 
          })
      }
      const token = jwt.sign(
        { id: user.id, email, role: user.role },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "3h",
        }
      );
      return res.json(
          {
              success: true,
              message: `login user successfully`,
              token: token
           
          }
      )
  } catch (error) {
      return res.json((
          {
              success: false,
              message: "can't login user",
              error: error
          }
      ));
  }
}

const profile = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneBy(
      {
        id: req.token.id
      }
    )

    return res.json(
      {
        success: true,
        message: "profile user retrieved",
        data: user
      }
    )
  } catch (error) {
    return res.json(
      {
        success: false,
        message: "user profile cant be retrieved",
        error: error
      }
    )
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUserData = req.body;
    const userId = req.token.id;
    const message = "Usuario actualizado correctamente";

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(req.body.email)) {
      return res.json({ message: "email format not valid" });
    }

    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);

    await User.update({ id: userId }, updatedUserData);

    const updatedUser = await User.findOneBy({ id: userId });

    const response = {
      message,
      user: updatedUser,
      password: encryptedPassword,
    };

    return res.json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Hubo un error al actualizar el usuario" });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
      const userIdToDelete = req.body.id
      const userDeleted = await User.delete(
          {
              id: parseInt(userIdToDelete)
          }
      )
      if (userDeleted.affected) {
          return res.json("Se ha eliminado correctamente el id " + userIdToDelete)
      }
      return res.json("No se ha podido eliminar el id " + userIdToDelete)
  } catch (error) {
      return res.json(error)
  }
}

const getUsers = async (req: Request, res: Response) => {
  try {
      // const users = await User.find()
      const pageSize: any = req.query.skyp || 10
      const page: any = req.query.page || 1

      const skip =(page - 1) * pageSize;

      const users = await User.find({
        skip: skip,
        take: pageSize,
      })
      return res.json(users)
  } catch (error) { return res.json(error) }
}

export {register, login, profile, updateUser, deleteUserById, getUsers}