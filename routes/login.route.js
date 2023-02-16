const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/',(request,response)=>{
    console.log("hellow")
    userController.loginUser(request,response)
});

module.exports = router;