const express = require("express");
const router = express.Router();

const {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
} = require("../middlewares/rateLimiter");

const authController = require("../controllers/authController");
const jwtValidate = require("../middlewares/jwtValidate");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerLimiter, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginLimiter, authController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed
 */
router.post("/refresh", refreshLimiter, authController.refreshToken);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", jwtValidate, authController.logout);

module.exports = router;
