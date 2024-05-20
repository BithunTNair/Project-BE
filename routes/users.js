var express = require('express');
var router = express.Router();
const {userAuth} = require('../middlewares/authorization');
const {getAllCourtData,singleCourtData,getSlotData}=require('../controllers/userController')

router.get('/getallcourtdata',userAuth,getAllCourtData );
router.get('/getsinglecourtdata',userAuth,singleCourtData );
router.get('/getslotdata',userAuth,getSlotData );

module.exports = router;
