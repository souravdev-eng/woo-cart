import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedError } from '../errors/unAuthorizedError';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new UnAuthorizedError('Oops. You are not logged in. Please login first.');
  }

  next();
};
