import { Request, Response, NextFunction, Router } from 'express';
import { currentUser, UnAuthorizedError } from '@woo-cart/common';

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
