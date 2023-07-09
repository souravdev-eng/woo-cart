import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { SignUpRoute } from './routes/signup';

const app = express();

app.use(express.json());
app.use(cors());

app.use(SignUpRoute);

app.use(errorHandler);

export { app };
