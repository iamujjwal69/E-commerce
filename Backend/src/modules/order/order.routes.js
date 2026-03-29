const express = require('express');
const router = express.Router();
const { placeOrder, getOrder, listUserOrders } = require('./order.controller');
const { requireAuth } = require('../../middleware/auth');

router.use(requireAuth);

router.post('/', placeOrder);
router.get('/', listUserOrders);
router.get('/:id', getOrder);

module.exports = router;
