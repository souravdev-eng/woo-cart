import mongoose from 'mongoose';

interface ProductAttrs {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  stock: number;
  seller: string;
  isInCart: boolean;
}

interface ProductDoc extends mongoose.Document {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  stock: number;
  seller: string;
  isInCart: boolean;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attars: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema<ProductAttrs>(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 100,
    },
    stock: {
      type: Number,
      default: 10,
    },
    seller: {
      type: String,
      required: true,
    },
    isInCart: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
