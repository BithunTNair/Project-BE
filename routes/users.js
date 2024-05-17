var express = require('express');
var router = express.Router();
const {userAuth} = require('../middlewares/authorization');
const {getAllCourtData,singleCourtData}=require('../controllers/userController')

router.get('/getallcourtdata',userAuth,getAllCourtData );
router.get('/getsinglecourtdata',userAuth,singleCourtData );

module.exports = router;
