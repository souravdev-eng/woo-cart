import request from 'supertest';
import { app } from '../../server';

describe('Success Case', () => {
  it('should return 200 if product delete successfully', async () => {
    const response = await request(app)
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
      .delete(`/api/product/${response.body.id}`)
      .set('Cookie', global.signIn())
      .send()
      .expect(200);

    await request(app)
      .get(`/api/product/${response.body.id}`)
      .set('Cookie', global.signIn())
      .send()
      .expect(404);
  });
});

describe('Error Case', () => {
  it('should return 404 if product id is not found', async () => {
    await request(app)
      .delete(`/api/product/64dd97befd3fd804411da321`)
      .set('Cookie', global.signIn())
      .send()
      .expect(404);
  });

  it('should return 401 if user not logged in and try to delete a product', async () => {
    const response = await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test',
        imageUrl: 'http://test.png',
        description: 'I am a test description',
        price: 105,
      })
      .expect(201);

    await request(app).delete(`/api/product/${response.body.id}`).send().expect(401);
  });
});
