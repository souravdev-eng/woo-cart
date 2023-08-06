import { Request, Response, NextFunction, Router } from 'express';
import { currentUser } from '../middleware/current-user';
import { UnAuthorizedError } from '../errors/unAuthorizedError';

const router = Router();

router.get(
  '/current-user',
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      return next(
        new UnAuthorizedError('Oops! You are not logged in. Please logged in first to access.')
      );
    }

    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRoute };
