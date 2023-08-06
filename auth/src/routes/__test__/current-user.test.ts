import request from 'supertest';
import { app } from '../../server';

describe('Current User', () => {
  it('should return 200 if user is already signup or login', async () => {
    const cookie = await global.signIn();
    const response = await request(app)
      .get('/api/users/current-user')
      .set('Cookie', cookie)
      .expect(200);

    expect(response.body.currentUser.email).toEqual('test@gmail.com');
  });

  it('should return 401 if user is not login', async () => {
    await request(app).get('/api/users/current-user').expect(401);
  });
});
