import { Message } from 'node-nats-streaming';
import { ProductCreatedEvent } from '../events/productCreatedEvent';
import { Listener } from '../events/baseListener';
import { Subjects } from '../types/subject';
export declare class ProductCreatedListener extends Listener<ProductCreatedEvent> {
    subject: Subjects.ProductCreated;
    queueGroupName: string;
    onMessage(data: ProductCreatedEvent['data'], msg: Message): void;
}
