# Amazon Replica Backend API

This backend serves as the core data layer for the Amazon India Replica e-commerce platform. It provides robust RESTful endpoints for Product Listings, User Authentication, persistent Cart Management, automated Order Checkouts, and dynamic Wishlists.

## 🚀 Technical Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (via Docker)
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Mailing Utility:** Nodemailer (configured with Ethereal SMTP for testing)

---

## 🏗️ Architecture & Features
- **Relational Models:** Users, Products, Categories, Carts, Orders, and Wishlists strictly bounded by foreign key constraints.
- **Stateless Authentication:** Generates tokens for secure JWT-based verification on protected routes (Checkout, Orders, Wishlist).
- **Automated Seeding:** Built-in `seed.js` script to instantly hydrate the database with rich Amazon product data, categories, and complex dynamic pricing.
- **Email Dispatch:** Integrates asynchronously with Nodemailer to push secure HTML email receipts to the terminal locally when an order successfully completes.

---

## 🛠️ Setup Instructions

### 1. Database Initialization
Ensure Docker Desktop is running. This application relies on a containerized PostgreSQL instance.
```bash
docker-compose up -d db
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root of the `backend` folder containing the following configuration keys (do not push this to version control):
```env
PORT=5000
DB_URL=postgresql://admin:password@localhost:5432/ecommerce
JWT_SECRET=super_secret_dev_key_123!
```

### 4. Seed and Run
Hydrate the database, then launch the API:
```bash
node src/seed.js
npm run dev
```
The server will boot and begin listening natively on `http://localhost:5000`.
