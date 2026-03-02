const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");

// Checkout User
router.post("/checkout", jwtValidate, orderController.checkout);

// Admin Controls
router.get("/", jwtValidate, adminValidate, orderController.getAllOrders);

router.get("/my", jwtValidate, orderController.getMyOrders);

router.put(
  "/:id",
  jwtValidate,
  adminValidate,
  orderController.updateOrder
);

router.delete(
  "/:id",
  jwtValidate,
  adminValidate,
  orderController.deleteOrder
);

module.exports = router;