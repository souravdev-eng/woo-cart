import mongoose from 'mongoose';
import { app } from './server';
import { natsWrapper } from './nats-wrapper';

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

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    // Closing connection

    natsWrapper.client.on('close', () => {
      console.log('*********************** NATS connection closed ***********************');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

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
