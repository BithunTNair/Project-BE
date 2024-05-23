var express = require('express');
var router = express.Router();
const {orders}= require('../controllers/paymentController');
const {userAuth} =require('../middlewares/authorization');
const { verify } = require('../controllers/paymentController');


router.post('/orders',userAuth,orders );
router.post('/verify',userAuth,verify );

module.exports = router;