import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

// Now routes will just hold the route and point to a specific controller function
// Instead of implementing the logic inside of the route

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
