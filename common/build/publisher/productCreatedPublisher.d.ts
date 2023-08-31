import { Publisher } from '../events/basePublisher';
import { ProductCreatedEvent } from '../events/productCreatedEvent';
import { Subjects } from '../types/subject';
export declare class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
    subject: Subjects.ProductCreated;
}
