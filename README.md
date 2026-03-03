🚀 Production-Ready E-Commerce REST API
Scalable • Secure • Transaction-Safe • Role-Based

A fully-featured, production-grade E-Commerce Backend built with Node.js, Express, MongoDB, implementing modern authentication, secure token rotation, role-based access control, transactional order processing, and API documentation.

Deployed live on Render.

🌍 Live API
https://e-commerce-project-backend-ib6m.onrender.com
📘 API Documentation (Swagger)
/docs
🏗 Architecture Overview

This project follows a clean layered architecture:

Controllers → Services → Models → Database
             ↓
          Middleware Layer

Controllers → Handle HTTP logic

Services → Business logic

Models → Database schema

Middleware → Security & validation

Swagger → API Documentation

🛠 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Refresh Token Rotation

Role-Based Authorization

Swagger (OpenAPI 3)

Winston Logger

Express Validator

Helmet

XSS-Clean

CORS

Rate Limiting

MongoDB Transactions (Session-based)

🔐 Authentication & Security Layer

This project implements advanced security patterns, not basic JWT only.

✅ Access Token (15 minutes)

Short-lived token for secure API access.

✅ Refresh Token (7 days)

Stored in database

Rotation strategy implemented

Old token becomes invalid after refresh

Protected against reuse attacks

✅ Token Blacklisting

On logout → Access token is blacklisted

Prevents reuse of revoked tokens

✅ Rate Limiting

Login: 5 attempts / 15 minutes

Register: 10 attempts / 15 minutes

Refresh: 20 attempts / 15 minutes

✅ Middleware Security

Helmet (HTTP security headers)

XSS protection

CORS configuration

Express Validator

Centralized Error Handler

👥 Role-Based Access Control (RBAC)

Two roles:

user

admin

Admin Capabilities:

Create products

Update products

Delete products

View all orders

Update order status

Delete orders

Users:

Register / Login

Manage cart

Checkout

View personal orders

🛒 Core Features
🧾 Authentication Module

User Registration

Secure Login (bcrypt hashed passwords)

JWT Access Token

Refresh Token Rotation

Logout with token invalidation

📦 Product Module
Public:

Get all products

Pagination

Search by name

Sorting support

Get product by ID

Admin Only:

Create product

Update product

Delete product

Includes:

Stock management

Category system

Product images array

🛒 Cart Module

Add product to cart

Remove item from cart

Get current cart

Prevent adding more than available stock

Auto cart creation per user

💳 Checkout & Orders (Transaction Safe)

This is production-level logic 👇

MongoDB Transactions Used

During checkout:

Stock is validated

Stock is deducted

Order is created

Cart is cleared

If any step fails → rollback happens

⚡ Ensures atomic operations and data integrity.

📦 Order Module

User:

View personal orders

Admin:

View all orders

Update order status

Delete order

Order statuses:

pending
processing
shipped
delivered
cancelled
📊 Pagination & Query Features

Products API supports:

page

limit

search

sort

Example:

/api/products?page=1&limit=10&search=hoodie&sort=-createdAt

Returns:

{
  "products": [],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5
  }
}
🧠 Production-Level Engineering Decisions

✔ Clean separation of concerns
✔ Token rotation strategy
✔ Blacklisted access tokens
✔ MongoDB transactions
✔ Centralized error handling
✔ Validation layer
✔ Security middleware stack
✔ Role-based route protection
✔ Swagger documentation
✔ Retry logic for database connection

📁 Project Structure
config/
controllers/
middlewares/
models/
routes/
services/
validators/
logs/
⚙️ Environment Variables

Create .env file:

MONGO_URI=your_mongo_uri
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
PORT=3002
🚀 Installation
npm install
npm run dev

📌 Why This Is Not Just a normal Project

This backend includes:

Token rotation strategy

Blacklisted tokens

Transaction-based checkout

Role-based access

Advanced security middleware

Swagger documentation

Pagination + search + sorting

Clean architecture pattern

This mirrors real-world backend systems used in production environments.


🔮 Future Improvements

Payment gateway integration (Stripe)

Image upload with Cloudinary

Caching (Redis)

Email notifications

CI/CD pipeline

Unit & Integration tests

Dockerization

👨‍💻 Author

Hassan mohamed gamal — Full Stack Developer / mern stack
Focused on building secure and scalable backend systems.
