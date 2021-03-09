import { ApplicationError } from "./application-error";
import { ValidationError } from "express-validator";
import { ErrorMessage } from "../interfaces/error-message";

export class RequestValidationError extends ApplicationError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): ErrorMessage[] {
    return this.errors.map(err => {
      return {
        message: err.msg,
        field: err.param
      };
    });
  }
}