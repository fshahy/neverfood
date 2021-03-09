import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../exceptions/application-error";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).send({
      errors: err.serializeErrors()
    });
  } else if (err.name === "UnauthorizedError") {
    res.status(401).send({
      errors: [{
        message: "user is not authorized"
      }]
    });
  } else {
    res.status(500).send({
      errors: [{
        message: err.message
      }]
    });
  }
};