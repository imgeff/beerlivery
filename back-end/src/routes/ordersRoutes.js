const { Router } = require('express');
const ordersController = require('../controllers/ordersController');

const router = Router();

router.get('/orders/:saleId', ordersController.getOrdersBySaleId);

module.exports = router;
