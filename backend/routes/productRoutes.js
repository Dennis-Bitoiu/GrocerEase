import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Now routes will just hold the route and point to a specific controller function
// Instead of implementing the logic inside of the route

router.route('/').get(getProducts);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
