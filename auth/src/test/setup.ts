import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../server';

declare global {
  function signIn(): Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'abac';
  process.env.JWT_EXPIRE_IN = '90d';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signIn = async () => {
  const name = 'test';
  const email = 'test@gmail.com';
  const password = '123456';
  const conformPassword = '123456';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      name,
      email,
      password,
      conformPassword,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};
