import nats from 'node-nats-streaming';
import { ProductCreatedPublisher } from './publisher/productCreatedPublisher';
console.clear();

/* The code is establishing a connection to a NATS streaming server. */
const stan = nats.connect('woocart', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher is connected to NATS...');

  const publisher = new ProductCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: '123',
      price: 200,
      description: 'test description',
      imageUrl: 'http://image.jpeg',
      seller: '123',
      title: 'test',
    });
  } catch (error) {
    console.log(error);
  }
});
