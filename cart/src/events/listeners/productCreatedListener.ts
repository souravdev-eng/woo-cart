import { Message } from 'node-nats-streaming';
import { Listener, ProductCreatedEvent, Subjects } from '@woo-cart/common';
import { Product } from '../../models/productModel';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = 'product-created-service-queueGroup';

  async onMessage(data: ProductCreatedEvent['data'], msg: Message): Promise<void> {
    const product = Product.build({
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl,
      seller: data.seller,
    });
    await product.save();
    msg.ack();
  }
}
