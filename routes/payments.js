var express = require('express');
var router = express.Router();
const {orders}= require('../controllers/paymentController');
const {userAuth} =require('../middlewares/authorization');
const { verify } = require('../controllers/paymentController');


router.get('/orders',userAuth,orders );
router.get('/verify',userAuth,verify );

module.exports = router;