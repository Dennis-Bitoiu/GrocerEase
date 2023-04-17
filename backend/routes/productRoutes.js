import express from 'express';
import AsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
const router = express.Router();

// Using an async handler simplifies error handling in route handlers,
// particularly for database calls. It avoids manual try-catch blocks,
// making code more readable and less error-prone.

// @description: Fetch all products
// @route: GET /api/products
// @access: Public (Anyone can access it)

router.get(
  '/',
  AsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @description: Fetch single product
// @route: GET /api/product/:id
// @access: Public (Anyone can access it)
router.get(
  '/:id',
  AsyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find object with the same 'id' key as the endpoint parameter
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      // If something happened. set the sstatus of the response to 404 and throw an error
      // Which will be caught by the errorHandler handler
      console.log('Not Valid')
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
