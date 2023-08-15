import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { Request, Response, NextFunction, Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { BadRequestError } from '../errors/badRequestError';
import { User } from '../models/userModel';

const router = Router();

router.post(
  '/login',
  [
    body('email').notEmpty().withMessage('Oops! Email is required.'),
    body('password').notEmpty().withMessage('Oops! Password is required.'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(new BadRequestError(`Oops! Invalid email or password`));
    }

    const isPasswordsValid = await User.comparePassword(password, existingUser.password);
    if (!isPasswordsValid) {
      return next(new BadRequestError(`Oops! Invalid email or password`));
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!,
      {
        expiresIn: process.env.JWT_EXPIRE_IN!,
      }
    );

    req.session = {
      jwt: token,
    };

    res.status(200).send(existingUser);
  }
);

export { router as loginUserRoute };
