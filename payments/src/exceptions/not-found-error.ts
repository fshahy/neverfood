import { ApplicationError } from "./application-error";
import { ErrorMessage } from "../interfaces/error-message";

export class NotFoundError extends ApplicationError {
  statusCode = 404;

  constructor(public message: string) {
    super();

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): ErrorMessage[] {
    return [{
      message: this.message,
    }];
  }
}