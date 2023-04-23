import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/login', authUser).post(authUser);

// Adding the 'protect' middleware requires a user to be authenticated in order to access a route
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.route('/').post(registerUser);

export default router;
