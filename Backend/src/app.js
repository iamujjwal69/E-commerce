require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Main entry
app.get('/', (req, res) => {
  res.send({ message: 'E-commerce API is running' });
});

app.use('/api/v1/products', require('./modules/product/product.routes'));
app.use('/api/v1/users', require('./modules/user/user.routes'));
app.use('/api/v1/cart', require('./modules/cart/cart.routes'));
app.use('/api/v1/orders', require('./modules/order/order.routes'));
app.use('/api/v1/wishlist', require('./modules/wishlist/wishlist.routes'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Internal Server Error' });
});

module.exports = app;
