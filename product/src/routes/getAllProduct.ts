import { Request, Response, NextFunction, Router } from 'express';
import { requireAuth } from '@woo-cart/common';
import { Product } from '../models/productModel';
const router = Router();

router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.find({});
  res.status(200).send(product);
});

export { router as getAllProductRoute };
