import { Request, Response } from "express";
import { Appointment } from "../models/appointments";

const create = async (req: Request, res: Response) => {
  try {
    if (req.token.id === req.body.client) {
      const title = req.body.title;
      const description = req.body.description;
      const worker = req.body.worker;
      const client = req.body.client;
      const date = req.body.date;
      const turn = req.body.turn;

      const formatedTurn = turn.toLowerCase();
      const formatedDate = date.replace(/\//g, "-");

      const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      const checkDate = regex.test(formatedDate);
      if (checkDate === false) {
        return res.json({ error: "Date Invalid" });
      }

      const newAppointment = await Appointment.create({
        title: title,
        description: description,
        worker: worker,
        client: client,
        appointment_date: formatedDate,
        appointment_turn: formatedTurn,
      }).save();

      return res.json({
        success: true,
        message: "Appointment created succesfully",
        appointment: {
          Title: newAppointment.title,
          Description: newAppointment.description,
          Worker: newAppointment.worker,
          Date: newAppointment.appointment_date,
          Turn: newAppointment.appointment_turn,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Appointment cant be created",
      error: error,
    });
  }
};



const update = async (req: Request, res: Response) => {
  try {
    
    if (req.token.id === req.body.user_id) {
      const appointmentToUpdate = req.body.id;

      const messageReturn = "Appointment updated succesfully";

      const id = req.body.id;
      const title = req.body.title;
      const description = req.body.description;
      const worker = req.body.worker;
      const client = req.body.client;
      const date = req.body.date;
      const turn = req.body.turn;

      await Appointment.update(
        { 
          id: parseInt(appointmentToUpdate),
        },
        {
          id: id,
          title: title,
          description: description,
          worker: worker,
          client: client,
          appointment_date: date,
          appointment_turn: turn,
        }
      );
 
      const updatedAppointment = await Appointment.findOneBy({
        id: parseInt(appointmentToUpdate),
      });

      const response = {
        message: messageReturn,
        updatedAppointment,
      };

      return res.json(response);
    }
  } catch (error) {
    return res.json(error);
  }
};

const deleteAppointment = async (req: Request, res: Response) => {
    try {
      if (req.token.id === req.body.user_id) {
        const appointmentId = req.body.id;
        const messageReturn = "Appointment deleted";
  
        const appointmentToRemove = await Appointment.findOneBy({
          id: parseInt(appointmentId),
        });
  
        if (!appointmentToRemove) {
          return res.status(404).json({ message: "Appointment not found" });
        }
  
        if (appointmentToRemove.client === req.body.user_id){
        await Appointment.delete(appointmentId);
  
        const response = {
          message: messageReturn,
          appointmentRemoved: appointmentToRemove,
        };
  
        return res.json(response);
      }  
        }
  
        
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

export { create, update, deleteAppointment};
