import { ApplicationError } from "./application-error";
import { ErrorMessage } from "../interfaces/error-message";

export class DuplicateUserError extends ApplicationError {
  statusCode = 400;

  constructor(public message: string) {
    super();

    Object.setPrototypeOf(this, DuplicateUserError.prototype);
  }

  serializeErrors(): ErrorMessage[] {
    return [{
      message: this.message,
    }];
  }
}