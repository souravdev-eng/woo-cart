import 'express-async-errors';
import cors from 'cors';
import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';

import { errorHandler } from './middleware/errorHandler';
import { signUpRoute } from './routes/signup';
import { loginUserRoute } from './routes/login';
import { NotFoundError } from './errors/notFoundError';
import { currentUserRoute } from './routes/current-user';

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

app.use('/api/users', signUpRoute);
app.use('/api/users', loginUserRoute);
app.use('/api/users', currentUserRoute);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError(`${req.originalUrl} is not find to this server!`));
});

app.use(errorHandler);

export { app };
