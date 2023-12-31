import { NextFunction, Request, Response } from "express";

const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {

  if (req.token.role !== "super_admin") {
    return res.json('No puedes hacer eso.')
  }

  next();
}

export { isSuperAdmin }