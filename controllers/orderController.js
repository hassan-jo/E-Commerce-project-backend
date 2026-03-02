const orderService = require("../services/orderService");

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(
      req.user.userId
    );

    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkout = async (req, res) => {
  try {
    const order = await orderService.checkout(req.user.userId);

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrder(
      req.params.id,
      req.body
    );

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id);

    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  checkout,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getMyOrders
};