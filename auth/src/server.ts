import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { SignUpRoute } from './routes/signup';
import { LoginUserRoute } from './routes/login';
import { NotFoundError } from './errors/notFoundError';

const app = express();

app.set('trust proxy', true);

app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);
app.use(express.json());
app.use(cors());

app.use(SignUpRoute);
app.use(LoginUserRoute);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError(`${req.originalUrl} is not find to this server!`));
});

app.use(errorHandler);

export { app };
