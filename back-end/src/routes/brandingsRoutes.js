const { Router } = require('express');
const brandingsController = require('../controllers/brandingsController');

const router = Router();

router.get('/brandings', brandingsController.getAll);

module.exports = router;
