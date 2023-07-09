import request from 'supertest';
import { app } from '../../server';

describe('Error Case', () => {
  it('should return 400 if user does not provide required property', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test',
        email: '',
        password: '123456',
        conformPassword: '123456',
      })
      .expect(400);

    await request(app)
      .post('/api/users/signup')
      .send({
        name: '',
        email: 'test@gmail.com',
        password: '123456',
        conformPassword: '123456',
      })
      .expect(400);

    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test',
        email: 'test@gmail.com',
        password: '',
        conformPassword: '123456',
      })
      .expect(400);

    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test',
        email: 'test@gmail.com',
        password: '123456',
        conformPassword: '',
      })
      .expect(400);
  });

  it('should return 400 if password and conformPassword does not match', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test',
        email: 'test@gmail.com',
        password: '123456',
        conformPassword: '1234567',
      })
      .expect(400);
  });

  it('should return 400 if user email address already exists', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test',
        email: 'test1@gmail.com',
        password: '123456',
        conformPassword: '123456',
      })
      .expect(201);

    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test',
        email: 'test1@gmail.com',
        password: '123456',
        conformPassword: '123456',
      })
      .expect(400);
  });

  it('should return 400 if user password length less than 6', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test',
        email: 'test@gmail.com',
        password: '1234',
        conformPassword: '1234',
      })
      .expect(400);
  });
});

describe('Success Case', () => {
  it('should return 201 after user successfully signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test',
        email: 'test1@gmail.com',
        password: '123456',
        conformPassword: '123456',
      })
      .expect(201);
  });
});
