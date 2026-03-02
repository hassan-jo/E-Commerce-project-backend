const cartService = require("../services/cartService");

// ADD TO CART
const addToCart = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "productId required"
      });
    }

    const cart = await cartService.addToCart(
      userId,
      productId,
      quantity || 1
    );

    res.json(cart);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.userId);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// REMOVE ITEM
const removeFromCart = async (req, res) => {
  try {
    const cart = await cartService.removeFromCart(
      req.user.userId,
      req.params.productId
    );

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};