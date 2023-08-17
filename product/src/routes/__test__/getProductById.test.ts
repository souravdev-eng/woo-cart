import request from 'supertest';
import { app } from '../../server';

describe('Success case', () => {
  it('should return 200 if product is found', async () => {
    const product = await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test',
        imageUrl: 'http://test.png',
        description: 'I am a test description',
        price: 105,
      })
      .expect(201);

    const response = await request(app)
      .get(`/api/product/${product.body.id}`)
      .set('Cookie', global.signIn())
      .send()
      .expect(200);

    expect(response.body.title).toEqual('Test');
  });
});

describe('Error case', () => {
  it('should return 401 if user not logged in first', async () => {
    const product = await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test',
        imageUrl: 'http://test.png',
        description: 'I am a test description',
        price: 105,
      })
      .expect(201);

    await request(app).get(`/api/product/${product.body.id}`).send().expect(401);
  });

  it('should return 404 if product not found', async () => {
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
      .get(`/api/product/64dd97befd3fd804411da321`)
      .set('Cookie', global.signIn())
      .send()
      .expect(404);
  });
});
