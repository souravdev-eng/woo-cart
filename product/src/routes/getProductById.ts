import { Request, Response, NextFunction, Router } from 'express';
import { NotFoundError, requireAuth } from '@woo-cart/common';
import { Product } from '../models/productModel';
const router = Router();

router.get('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findById({ _id: req.params.id });

  if (!product) {
    return next(new NotFoundError('Oops! Product not found'));
  }

  res.status(200).send(product);
});

export { router as getProductByIdRoute };
