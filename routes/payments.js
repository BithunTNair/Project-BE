var express = require('express');
var router = express.Router();
const {orders}= require('../controllers/paymentController');


router.get('/orders',orders );

module.exports = router;