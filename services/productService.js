const Product = require("../models/Product");

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const getProducts = async (
  page = 1,
  limit = 10,
  search = "",
  sort = "-createdAt"
) => {

  try {

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return {
      products: products || [],
      pagination: {
        total: total || 0,
        page,
        pages: Math.ceil(total / limit) || 1
      }
    };

  } catch (error) {
    console.error("PRODUCT SERVICE ERROR:", error);
    throw new Error("Database query failed");
  }
};
const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) throw new Error("Product not found");

  return product;
};

const updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!product) throw new Error("Product not found");

  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) throw new Error("Product not found");

  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};