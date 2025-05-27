const express = require('express');
const router = express.Router();
const { addSale } = require('../controller/salesController');

router.post('/sales', addSale);

module.exports = router;
