const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Checkout user cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/checkout", jwtValidate, orderController.checkout);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/", jwtValidate, adminValidate, orderController.getAllOrders);

/**
 * @swagger
 * /orders/my:
 *   get:
 *     summary: Get user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User orders list
 */
router.get("/my", jwtValidate, orderController.getMyOrders);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order updated
 */
router.put(
  "/:id",
  jwtValidate,
  adminValidate,
  orderController.updateOrder
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order deleted
 */
router.delete(
  "/:id",
  jwtValidate,
  adminValidate,
  orderController.deleteOrder
);

module.exports = router;
