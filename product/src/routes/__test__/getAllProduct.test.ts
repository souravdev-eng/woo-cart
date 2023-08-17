import request from 'supertest';
import { app } from '../../server';

describe('Success case', () => {
  it('should return product array', async () => {
    await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test',
        imageUrl: 'http://test.png',
        description: 'I am a test description',
        price: 105,
      })
      .expect(201);
    await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test 2',
        imageUrl: 'http://test2.png',
        description: 'I am a test description',
        price: 400,
      })
      .expect(201);

    const response = await request(app).get('/api/product').set('Cookie', global.signIn());
    expect(response.body).toHaveLength(2);
  });
});

describe('Error case', () => {
  it('should return 401 if user not logged in', async () => {
    await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test 2',
        imageUrl: 'http://test2.png',
        description: 'I am a test description',
        price: 400,
      })
      .expect(201);

    await request(app).get('/api/product').expect(401);
  });
});
