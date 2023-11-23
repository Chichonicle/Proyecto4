import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { Appointment } from "../models/appointments"
import { worker } from "../models/worker";
import { Proyects } from "../models/Proyects";

const register = async (req: Request, res: Response) => {
    try {
   
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password
  
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
      if (!emailRegex.test(email)) {
        return res.json({ mensaje: 'Correo electrónico no válido' });
      }
      const encryptedPassword = bcrypt.hashSync(password, 10)

    const newUser = await User.create({
      name: name,
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
              token: token,
              user: user
           
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
      const pageSize: any = req.query.skyp || 999
      const page: any = req.query.page || 1

      const skip =(page - 1) * pageSize;

      const users = await User.find({
        skip: skip,
        take: pageSize,
      })
      return res.json(users)
  } catch (error) { return res.json(error) }
}
const myAppointments = async (req: Request, res: Response) => {
  try {
    const message = "Your user appointments";
    // if (req.token.id === req.body.id) {
    //   const userId = req.body.id;

      const userId = req.token.id

      

      const pageSize: any = parseInt(req.query.skip as string) || 99999;
      const page: any = parseInt(req.query.skip as string) || 1;

      const skip = (page - 1) * pageSize;

      const myAppointments = await Appointment.find({
        where: { client: userId },
        select: {
          id: true,
          worker: true,
          title: true,
          description: true,
          appointment_date: true,
          appointment_turn: true,
        },
        
        relations: {
          userAppointment: true,
          workerAppointment: true,
        },

        skip: skip,
        take: pageSize,
      });
   
      const filteredAppointments = myAppointments.map((appointment) => ({
        Appointment_id: appointment.id,
        title: appointment.title,
        description: appointment.description,
        appointment_date: appointment.appointment_date,
        appointment_turn: appointment.appointment_turn,
        worker: appointment.workerAppointment.name,
        Client: appointment.userAppointment.name,
      }));
      
      if (filteredAppointments.length === 0) {
        return res.json({ message: "No hay citas disponibles." });
      }

      const response = {
        message: message,
        myAppointments: filteredAppointments,
      };
      return res.json(response);
    // }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const changeRole = async (req: Request, res: Response) => {
  try {
      const userIdToUpdate = req.body.id
      const userUpdate = await User.findOneBy(
          {
              id: parseInt(userIdToUpdate)
          })
      if (userUpdate!) {
          await User.update(userIdToUpdate, req.body)
          return res.json("Se ha modificado correctamente")
      }
      return res.json("No se ha encontrado el usuario a modificar")
  } catch (error) {
      return res.json(error)
  }
}

const getWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await worker.find({
      select: {
        id: true,
        name: true,
        licenseNumber: true,
        photo: true,
        proyects: {
          id: true,
          worker_id: false,
          proyectName: true,
          tattooname: true,
          tattoo_url: true,
          created_at: false,
          updated_at: false,
        }
      },
      relations: {
        proyects: true,
      },
    }
  )

    return res.json({
      message: "Workers list",
      workers,
    });
  } catch {
    return res.json({
      success: true,
      message: "cant retrieve workers list",
    });
  }
};


const getProyects = async (req: Request, res: Response) => {
  
  try {
    
    const proyects = await Proyects.find({
      select: {
          id: true,
          worker_id: false,
          proyectName: true,
          tattooname: true,
          tattoo_url: true,
          created_at: false,
          updated_at: false,
        }
      },
    )  

    return res.json({
      message: "proyects list",
      proyects,
    });
  
  } catch {
    return res.json({
      success: true,
      message: "cant retrieve proyects list",
    });
  }
};

const allAppointments = async (req: Request, res: Response) => {
  try {
    const message = "Your user appointments";
    // if (req.token.id === req.body.id) {
    //   const userId = req.body.id;


      const pageSize: any = parseInt(req.query.skip as string) || 99999;
      const page: any = parseInt(req.query.skip as string) || 1;

      const skip = (page - 1) * pageSize;

      const myAppointments = await Appointment.find({
        select: {
          id: true,
          worker: true,
          title: true,
          description: true,
          appointment_date: true,
          appointment_turn: true,
        },
        
        relations: {
          userAppointment: true,
          workerAppointment: true,
        },

        skip: skip,
        take: pageSize,
      });
   
      const filteredAppointments = myAppointments.map((appointment) => ({
        Appointment_id: appointment.id,
        title: appointment.title,
        description: appointment.description,
        appointment_date: appointment.appointment_date,
        appointment_turn: appointment.appointment_turn,
        worker: appointment.workerAppointment.name,
        Client: appointment.userAppointment.name,
      }));
      
      if (filteredAppointments.length === 0) {
        return res.json({ message: "No hay citas disponibles." });
      }

      const response = {
        message: message,
        myAppointments: filteredAppointments,
      };
      return res.json(response);
    // }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export {register, login, profile, updateUser, deleteUserById, getUsers, myAppointments, changeRole, getWorkers, getProyects, allAppointments}