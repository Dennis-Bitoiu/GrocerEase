import AsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// Using an async handler simplifies error handling in route handlers,
// particularly for database calls. It avoids manual try-catch blocks,
// making code more readable and less error-prone.

// @description: Create new order
// @route: POST /api/orders
// @access: Procate (Only logged in users can access it)
const addOrderItems = AsyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,

      shippingAddress,
      paymentMethod,
      itemsPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };
