const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getUserOrders = async (userId) => {
  return await Order.find({ user: userId })
    .populate("items.product")
    .sort({ createdAt: -1 });
};

const checkout = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    let totalPrice = 0;

    const orderItems = [];

    // Check stock + deduct stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id).session(
        session
      );

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for product ${product.name}`
        );
      }

      // Deduct stock
      product.stock -= item.quantity;
      await product.save({ session });

      totalPrice += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create(
      [
        {
          user: userId,
          items: orderItems,
          totalPrice,
          status: "pending",
        },
      ],
      { session }
    );

    // Clear cart
    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

const getAllOrders = async () => {
  return await Order.find()
    .populate("user", "username email")
    .populate("items.product");
};

const updateOrder = async (orderId, updateData) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    updateData,
    { new: true }
  );

  if (!order) throw new Error("Order not found");

  return order;
};

const deleteOrder = async (orderId) => {
  const order = await Order.findByIdAndDelete(orderId);

  if (!order) throw new Error("Order not found");

  return order;
};

module.exports = {
  getUserOrders,
  checkout,
  getAllOrders,
  updateOrder,
  deleteOrder,
};