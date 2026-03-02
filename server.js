require("dotenv").config();

const express = require("express");
const path = require("path");

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

/* ========================================
   Core Middleware
======================================== */

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://e-commerce-project-backend-ib6m.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

/* ========================================
   Security Layer
======================================== */

app.use(helmet());
app.use(xss());

/* ========================================
   Swagger Configuration (Professional Level)
======================================== */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "E-Commerce SaaS Backend API",
      version: "1.0.0",
      description: `
Professional Backend Architecture

Features Included:

• JWT Authentication System  
• Refresh Token Rotation Strategy  
• Role Based Access Control  
• Secure Cart Transaction Flow  
• MongoDB Cloud Storage  
• Pagination Engine  
• Search & Sorting Support  

This API is designed for production SaaS marketplace usage.
      `
    },

    servers: [
      {
        url: "https://e-commerce-project-backend-ib6m.onrender.com",
        description: "Production Server"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ========================================
   Database Connection
======================================== */

connectDB();

/* ========================================
   Routes Layer
======================================== */

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

/* ========================================
   Global Error Handler
======================================== */

app.use(errorHandler);

/* ========================================
   Server Bootstrap
======================================== */

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
