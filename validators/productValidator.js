const { body, validationResult } = require("express-validator");

const productValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("description")
    .trim()
    .isLength({ min: 10 }),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Invalid price"),

  body("category").notEmpty(),

  body("stock").optional().isInt({ min: 0 }),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  productValidation,
  validateRequest,
};