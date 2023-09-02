import { Request, Response, NextFunction, Router } from 'express';
import { NotFoundError, BadRequestError, requireAuth } from '@woo-cart/common';
import { Cart } from '../models/cartModel';
import { Product } from '../models/productModel';

const router = Router();

router.post('/new', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError('Product not found');
  }

  if (product.stock === 0) {
    throw new BadRequestError('Product is out of stock');
  }

  const existCart = await Cart.findOne({ product });
  if (existCart) {
    existCart.set({
      quantity: existCart.quantity + 1,
    });
    await existCart.save();
    res.status(200).send(existCart);
  } else {
    const cart = Cart.build({
      product,
      userId: req.currentUser?.id!,
      quantity: 1,
    });

    await cart.save();
    res.status(201).send(cart);
  }
});

export { router as cartCreateRoute };
