import express from 'express';
const router = express.Router();
import { authUser } from '../controllers/userController.js';

router.route('/login', authUser).post(authUser);

export default router;
