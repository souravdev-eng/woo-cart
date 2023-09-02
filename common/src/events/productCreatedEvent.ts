import { Subjects } from '../types/subject';

export interface ProductCreatedEvent {
  subject: Subjects.ProductCreated;
  data: {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    stock: number;
    seller: string;
  };
}
