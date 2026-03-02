require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

/* ================================
   Core Middleware
================================ */

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* ================================
   Security Middleware (Simple Version)
================================ */

app.use(helmet());
app.use(xss());

/* ================================
   Swagger Docs
================================ */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0"
    }
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/* ================================
   Database Connection
================================ */

connectDB();

/* ================================
   Routes
================================ */

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

/* ================================
   Error Handler (Always Last)
================================ */

app.use(errorHandler);

/* ================================
   Server Start
================================ */

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});