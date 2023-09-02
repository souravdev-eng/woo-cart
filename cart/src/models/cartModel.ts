import mongoose from 'mongoose';
import { ProductDoc } from './productModel';

interface CartAttrs {
  product: ProductDoc;
  userId: string;
  quantity: number;
}

interface CartDoc extends mongoose.Document {
  product: ProductDoc;
  userId: string;
  quantity: number;
}

interface CartModel extends mongoose.Model<CartDoc> {
  build(attrs: CartAttrs): CartDoc;
}

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    userId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

cartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };
