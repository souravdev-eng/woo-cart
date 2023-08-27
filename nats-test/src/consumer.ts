import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('woocart', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const eventName = 'product:created';
  const options = stan.subscriptionOptions().setDeliverAllAvailable().setManualAckMode(true);

  const subscription = stan.subscribe(eventName, 'product-service-queue-group', options);

  subscription.on('message', (msg: Message) => {
    console.log(`Event received: ${eventName}`);
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
      msg.ack();
    }
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
