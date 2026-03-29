const express = require('express');
const router = express.Router();
const { getWishlist, addItem, removeItem } = require('./wishlist.controller');
const { requireAuth } = require('../../middleware/auth');

router.use(requireAuth);

router.get('/', getWishlist);
router.post('/items', addItem);
router.delete('/items/:productId', removeItem);

module.exports = router;
