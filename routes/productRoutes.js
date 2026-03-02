const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");

const {
  productValidation,
  validateRequest,
} = require("../validators/productValidator");

// Admin Only + Validation Layer
router.post(
  "/",
  jwtValidate,
  adminValidate,
  productValidation,
  validateRequest,
  productController.createProduct
);

// Update Product
router.put(
  "/:id",
  jwtValidate,
  adminValidate,
  productController.updateProduct
);

// Delete Product
router.delete(
  "/:id",
  jwtValidate,
  adminValidate,
  productController.deleteProduct
);

// Public Routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

module.exports = router;