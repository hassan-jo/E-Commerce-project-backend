const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");

const {
  productValidation,
  validateRequest,
} = require("../validators/productValidator");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management APIs
 */

/* =====================================
   Create Product (Admin Only)
===================================== */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create Product
 *     description: Admin only endpoint to create new product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post(
  "/",
  jwtValidate,
  adminValidate,
  productValidation,
  validateRequest,
  productController.createProduct
);

/* =====================================
   Update Product
===================================== */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update Product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put(
  "/:id",
  jwtValidate,
  adminValidate,
  productController.updateProduct
);

/* =====================================
   Delete Product
===================================== */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete Product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete(
  "/:id",
  jwtValidate,
  adminValidate,
  productController.deleteProduct
);

/* =====================================
   Public Routes
===================================== */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get Products List
 *     tags: [Products]
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
router.get("/", productController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get Product By ID
 *     tags: [Products]
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Product found
 */
router.get("/:id", productController.getProductById);

module.exports = router;const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");

const {
  productValidation,
  validateRequest,
} = require("../validators/productValidator");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management APIs
 */

/* =====================================
   Create Product (Admin Only)
===================================== */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create Product
 *     description: Admin only endpoint to create new product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post(
  "/",
  jwtValidate,
  adminValidate,
  productValidation,
  validateRequest,
  productController.createProduct
);

/* =====================================
   Update Product
===================================== */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update Product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put(
  "/:id",
  jwtValidate,
  adminValidate,
  productController.updateProduct
);

/* =====================================
   Delete Product
===================================== */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete Product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete(
  "/:id",
  jwtValidate,
  adminValidate,
  productController.deleteProduct
);

/* =====================================
   Public Routes
===================================== */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get Products List
 *     tags: [Products]
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
router.get("/", productController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get Product By ID
 *     tags: [Products]
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Product found
 */
router.get("/:id", productController.getProductById);

module.exports = router;
