import 'express-async-errors';
import cors from 'cors';

import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';
import { errorHandler, NotFoundError, currentUser } from '@woo-cart/common';
import { productCreateRoute } from './routes/createProduct';
import { getAllProductRoute } from './routes/getAllProduct';
import { getProductByIdRoute } from './routes/getProductById';
import { deleteProductByIdRoute } from './routes/deleteProduct';

const app = express();

app.set('trust proxy', true);
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);
app.use(express.json());
app.use(cors());
app.use(currentUser);

app.use('/api/product', productCreateRoute);
app.use('/api/product', getAllProductRoute);
app.use('/api/product', getProductByIdRoute);
app.use('/api/product', deleteProductByIdRoute);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError(`${req.originalUrl} is not find to this server!`));
});

app.use(errorHandler);

export { app };
