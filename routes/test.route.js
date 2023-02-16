const express = require('express');
const router = express.Router();

router.post('/',async(request,response)=>{
    //await authController.verifyToken(request,response);
    response.status(200).send("test api success")

    
})
module.exports = router;