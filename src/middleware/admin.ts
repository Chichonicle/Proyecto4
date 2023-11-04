import { NextFunction, Request, Response } from "express";

const admin = (req: any, res: Response, next: NextFunction) => {

  if (req.token.role !== "admin") {
    return res.json('No puedes hacer eso.')
  }

  next();
}

export { admin }