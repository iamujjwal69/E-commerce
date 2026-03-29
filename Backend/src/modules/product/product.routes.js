const express = require('express');
const router = express.Router();
const ProductController = require('./product.controller');

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);

module.exports = router;
