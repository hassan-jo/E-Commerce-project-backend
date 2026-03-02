const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const jwtValidate = require("../middlewares/jwtValidate");

router.post("/", jwtValidate, cartController.addToCart);
router.get("/", jwtValidate, cartController.getCart);
router.delete("/:productId", jwtValidate , cartController.removeFromCart);


module.exports = router;
