const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const jwtValidate = require("../middlewares/jwtValidate");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management APIs
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Item added to cart
 */
router.post("/", jwtValidate, cartController.addToCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart data
 */
router.get("/", jwtValidate, cartController.getCart);

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed
 */
router.delete("/:productId", jwtValidate, cartController.removeFromCart);

module.exports = router;
