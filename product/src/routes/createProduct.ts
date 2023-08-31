import { Request, Response, NextFunction, Router } from 'express';
import { ProductCreatedPublisher, requireAuth, validateRequest } from '@woo-cart/common';
import { Product } from '../models/productModel';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';

const router = Router();

router.post(
  '/new',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Oops! Please provide product title'),
    body('description').notEmpty().withMessage('Oops! Please provide product description'),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isNumeric()
      .withMessage('Price must be a numeric value')
      .custom((value) => parseFloat(value) > 100)
      .withMessage('Price must be greater than 100'),
    body('imageUrl').notEmpty().withMessage('Oops! Please provide product imageUrl'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const product = Product.build({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      seller: req?.currentUser?.id!,
    });

    await product.save();

    await new ProductCreatedPublisher(natsWrapper.client).publish({
      id: product.id,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      seller: product.seller,
      title: product.title,
    });

    res.status(201).send(product);
  }
);

export { router as productCreateRoute };
