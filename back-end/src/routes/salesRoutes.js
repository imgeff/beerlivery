const { Router } = require('express');
const salesController = require('../controllers/salesController');
const authorizationToken = require('../middlewares/auth/authorizationToken');

const router = Router();

router.post('/sales', authorizationToken, salesController.createSale);
router.get('/sales/seller/:id', salesController.getSalesBySeller);
router.patch('/sales/:id', salesController.updateStatusSale);
router.get('/sales/customer/:id', salesController.getSalesByUser);

module.exports = router;
