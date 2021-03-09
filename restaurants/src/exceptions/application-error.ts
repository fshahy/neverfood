import { ErrorMessage } from "../interfaces/error-message";


export abstract class ApplicationError extends Error {
  abstract statusCode: number;

  constructor() {
    super();

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }

  abstract serializeErrors(): ErrorMessage[];
}