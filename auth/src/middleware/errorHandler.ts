import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/customError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  if (process.env.NODE_ENV !== 'Test') {
    console.log(err);
  }

  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
