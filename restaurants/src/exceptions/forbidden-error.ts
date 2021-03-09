import { ApplicationError } from "./application-error";
import { ErrorMessage } from "../interfaces/error-message";

export class ForbiddenError extends ApplicationError {
    statusCode = 403;

    constructor(public message: string) {
        super();

        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }

    serializeErrors(): ErrorMessage[] {
        return [{
            message: this.message,
        }];
    }
}