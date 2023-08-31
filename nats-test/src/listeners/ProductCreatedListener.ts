import { Message } from 'node-nats-streaming';
import { ProductCreatedEvent } from '../events/productCreatedEvent';
import { Listener } from '../events/baseListener';
import { Subjects } from '../types/subject';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = 'product-created-service';

  onMessage(data: ProductCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);

    msg.ack();
  }
}
