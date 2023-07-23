import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { Request, Response, NextFunction, Router } from 'express';
import { BadRequestError } from '../errors/badRequestError';
import { validateRequest } from '../middleware/validateRequest';
import { User } from '../models/userModel';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('name').notEmpty().withMessage('Oops! Please provide your name'),
    body('email').isEmail().withMessage('Oops! Please provide valid email address'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Oops! Password must be between 6 to 20 characters'),
    body('conformPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Oops! Password conformation does not match');
        }
        return true;
      }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, conformPassword } = req.body;
    const existUser = await User.findOne({ email: req.body.email });

    if (existUser) {
      return next(new BadRequestError('Oops! Email already in use. Please use a different email'));
    }

    const user = User.build({ name, email, password, conformPassword });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY!, {
      expiresIn: process.env.JWT_EXPIRE_IN!,
    });

    req.session = {
      jwt: token,
    };

    res.status(201).send(user);
  }
);

export { router as SignUpRoute };
