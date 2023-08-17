import request from 'supertest';
import { app } from '../../server';
import { describe } from 'node:test';

describe('Success Case', () => {
  it('should return 201 if product successfully created', async () => {
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
  });
});

describe('Error Case', () => {
  it('should return 401 if seller try to create product before logged in', async () => {
    await request(app)
      .post('/api/product/new')
      .send({
        title: 'Test',
        imageUrl: 'http://test.png',
        description: 'I am a test description',
        price: 105,
      })
      .expect(401);
  });

  it('should return 404 api end point is incorrect', async () => {
    await request(app)
      .post('/api/product/abc')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test',
        imageUrl: 'http://test.png',
        description: 'I am a test description',
        price: 105,
      })
      .expect(404);
  });

  it('should return 400 if product price less than 100 rupees', async () => {
    await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test',
        imageUrl: 'http://test.png',
        description: 'I am a test description',
        price: 99,
      })
      .expect(400);
  });

  it('should return 400 if required property is missing before create a new product', async () => {
    await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        imageUrl: 'http://test.png',
        description: 'I am a test description',
        price: 105,
      })
      .expect(400);
    await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test',
        description: 'I am a test description',
        price: 105,
      })
      .expect(400);
    await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test',
        imageUrl: 'http://test.png',
        price: 105,
      })
      .expect(400);
    await request(app)
      .post('/api/product/new')
      .set('Cookie', global.signIn())
      .send({
        title: 'Test',
        imageUrl: 'http://test.png',
        description: 'I am a test description',
      })
      .expect(400);
  });
});
