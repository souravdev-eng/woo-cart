import request from 'supertest';
import { app } from '../../server';
import { Product } from '../../models/productModel';
import mongoose from 'mongoose';

describe('Success Case', () => {
  it('should return 201 if cart item added successfully', async () => {
    const product = Product.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      description: 'test',
      imageUrl: 'test',
      price: 300,
      seller: new mongoose.Types.ObjectId().toHexString(),
      stock: 15,
      title: 'test title',
    });

    await product.save();

    await request(app)
      .post('/api/cart/new')
      .set('Cookie', global.signIn())
      .send({ productId: product.id, quantity: 1 })
      .expect(201);
  });

  it('should return 200 if product already in a cart and update only quantity by 1', async () => {
    const product = Product.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      description: 'test',
      imageUrl: 'test',
      price: 300,
      seller: new mongoose.Types.ObjectId().toHexString(),
      stock: 15,
      title: 'test title',
    });

    await product.save();

    await request(app)
      .post('/api/cart/new')
      .set('Cookie', global.signIn())
      .send({ productId: product.id, quantity: 1 })
      .expect(201);

    const cart = await request(app)
      .post('/api/cart/new')
      .set('Cookie', global.signIn())
      .send({ productId: product.id, quantity: 1 })
      .expect(200);

    expect(cart.body.quantity).toEqual(2);
  });
});
