import mongoose from 'mongoose';
import { app } from './server';

const PORT = 4000;

const start = async () => {
  if (!process.env.JWT_EXPIRE_IN) {
    throw new Error('JWT_EXPIRE_IN must be defined');
  }
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.PRODUCT_SERVICE_DB_URI) {
    throw new Error('PRODUCT_SERVICE_DB_URI must be defined');
  }
  if (!process.env.MONGO_USER) {
    throw new Error('MONGO_USER must be defined');
  }
  if (!process.env.PRODUCT_MONGO_PASSWORD) {
    throw new Error('PRODUCT_MONGO_PASSWORD must be defined');
  }

  try {
    await mongoose.connect(process.env.PRODUCT_SERVICE_DB_URI!, {
      user: process.env.MONGO_USER!,
      pass: process.env.PRODUCT_MONGO_PASSWORD!,
    });
    console.log('Product DB connected successfully...');
  } catch (error: any) {
    console.log('DB connection Error', error.message);
  }

  app.listen(PORT, () => {
    console.log(`Woo Cart Product Service is Listen on PORT: ${PORT}`);
  });
};

start();
