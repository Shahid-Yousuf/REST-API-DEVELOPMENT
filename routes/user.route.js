const express = require('express');
const router = express.Router();
router.put('/update-password',(request,response)=>{
    console.log(request.body.token);
});
module.exports = router;