// Order model of the database
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
          quantity: Number,
          image: String,
          price: Number,
          product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
          },
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    // Payment results will come from the PayPal API
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email: { type: String },
    },
    deliveryPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },

  //  Second argument, options of the schema
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
