const express = require("express");
const router = express.Router();

const {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
} = require("../middlewares/rateLimiter");

const authController = require("../controllers/authController");
const jwtValidate = require("../middlewares/jwtValidate");

router.post("/register", registerLimiter, authController.register);
router.post("/login", loginLimiter, authController.login);
router.post("/refresh", refreshLimiter, authController.refreshToken);
router.post("/logout", jwtValidate, authController.logout);

module.exports = router;