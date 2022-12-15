const { Router } = require('express');
const saleProductsController = require('../controllers/salesProductsController');

const router = Router();

router.get('/orders/:saleId', saleProductsController.getById);

module.exports = router;
