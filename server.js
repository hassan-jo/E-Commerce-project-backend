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

/* ===============================
   Core Middleware
================================ */

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://e-commerce-project-frontend.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

/* ===============================
   Security Middleware
================================ */

app.use(helmet());
app.use(xss());

/* ===============================
   Database Connection
================================ */

connectDB();

/* ===============================
   Swagger Documentation
================================ */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "E-Commerce SaaS Backend API",
      version: "1.0.0",
      description:
        "Professional Backend Architecture\n\n" +
        "Features Included:\n" +
        "• JWT Authentication System\n" +
        "• Refresh Token Rotation Strategy\n" +
        "• Role Based Access Control\n" +
        "• Secure Cart Transaction Flow\n" +
        "• MongoDB Cloud Storage\n" +
        "• Pagination Engine\n" +
        "• Search & Sorting Support\n\n" +
        "This API is designed for production SaaS marketplace usage."
    },

    servers: [
      {
        url: "https://e-commerce-project-backend-ib6m.onrender.com",
        description: "Production Server"
      }
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        BearerAuth: []
      }
    ]
  },

  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ===============================
   Routes
================================ */

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

/* ===============================
   Error Handler
================================ */

app.use(errorHandler);

/* ===============================
   Server Start
================================ */

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
