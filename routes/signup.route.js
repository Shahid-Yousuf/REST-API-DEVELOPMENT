const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/',(request,response)=>{
    userController.registerUser(request,response)
//    console.log(request.body);
//    console.log(request.file);
//    response.end()
});

router.post('/',(request,response)=>{
    console.log("hello login api")
})

module.exports = router;