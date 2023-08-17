import mongoose from 'mongoose';

interface ProductAttrs {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  seller: string;
}

interface ProductDoc extends mongoose.Document {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  seller: string;
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
    seller: {
      type: String,
      required: true,
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
