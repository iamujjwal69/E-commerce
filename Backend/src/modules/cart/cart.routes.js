const express = require('express');
const router = express.Router();
const { getCart, addItem, updateItem, removeItem } = require('./cart.controller');
const { requireAuth } = require('../../middleware/auth');

router.use(requireAuth);

router.get('/', getCart);
router.post('/items', addItem);
router.put('/items/:itemId', updateItem);
router.delete('/items/:itemId', removeItem);

module.exports = router;
