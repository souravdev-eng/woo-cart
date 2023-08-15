import request from 'supertest';
import { app } from '../../server';

describe('Success case', () => {
  it('should return 200 if user successfully logged in', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test',
        email: 'test1@gmail.com',
        password: '123456',
        conformPassword: '123456',
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test1@gmail.com',
        password: '123456',
      })
      .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
describe('Failure case', () => {
  it('should return 400 if user email does not exist in database', async () => {
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
      .post('/api/users/login')
      .send({
        email: 'testabc@gmail.com',
        password: '123456',
      })
      .expect(400);
  });
  it('should return 400 if user password does not match', async () => {
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
      .post('/api/users/login')
      .send({
        email: 'test1@gmail.com',
        password: '123456789',
      })
      .expect(400);
  });
  it('should return 400 if user does not provide email or password', async () => {
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
      .post('/api/users/login')
      .send({
        email: 'test1@gmail.com',
      })
      .expect(400);

    await request(app)
      .post('/api/users/login')
      .send({
        password: '123456',
      })
      .expect(400);
  });
});
