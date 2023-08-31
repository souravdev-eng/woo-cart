import { Publisher } from '../events/basePublisher';
import { ProductCreatedEvent } from '../events/productCreatedEvent';
import { Subjects } from '../types/subject';

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
