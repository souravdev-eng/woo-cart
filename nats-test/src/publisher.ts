import nats, { Stan } from 'node-nats-streaming';
console.clear();

/* The code is establishing a connection to a NATS streaming server. */
const stan = nats.connect('woocart', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher is connected to NATS...');

  const data = JSON.stringify({
    id: '123',
    title: 'test',
    price: 200,
  });
  const eventName = 'product:created';
  stan.publish(eventName, data, () => {
    console.log(`Event published ${eventName}`);
  });
});
