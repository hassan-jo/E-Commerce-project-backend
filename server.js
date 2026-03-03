require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const swaggerSpec = require("./config/swagger");
const swaggerUi = require("swagger-ui-express");

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
  origin: "https://e-commerce-project-frontend-glwt.onrender.com",
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
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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

