import AsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// Using an async handler simplifies error handling in route handlers,
// particularly for database calls. It avoids manual try-catch blocks,
// making code more readable and less error-prone.

// @description: Create new order
// @route: POST /api/orders
// @access: Private (Only logged in users can access it)
const addOrderItems = AsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    deliveryFee,
    total,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,

      shippingAddress,
      paymentMethod,
      totalPrice: total,
      deliveryPrice: deliveryFee,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @description: Get order by id
// @route: GET /api/orders/:id
// @access: Private (Only logged in users can access it)
const getOrderById = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email '
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

// @description: Update order to 'paid'
// @route: PUT /api/orders/:id/pay
// @access: Private (Only logged in users can access it)
const updateOrderToPaid = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

// @description: GET logged in user orders
// @route: GET /api/orders/myorders
// @access: Private (Only logged in users can access it)
const getMyOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
