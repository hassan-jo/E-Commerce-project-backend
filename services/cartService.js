const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);

  if (!product) throw new Error("Product not found");

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    if (product.stock < existingItem.quantity + quantity) {
      throw new Error("Insufficient stock");
    }

    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity,
    });
  }

  await cart.save();

  return cart;
};
// GET CART
const getCart = async (userId) => {
  return await Cart.findOne({ user: userId }).populate("items.product");
};

// REMOVE ITEM
const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  return cart;
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};