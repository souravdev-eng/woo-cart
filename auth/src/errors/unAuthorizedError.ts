import { CustomError } from './customError';

export class UnAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
