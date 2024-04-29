const express = require('express');
const productController = require('../controllers/products');

const router = express.Router();

router.route('/').get(productController.viewAllProducts);
// router.route('/:name').get(productController.viewAllProducts);

module.exports = router;
