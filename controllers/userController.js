const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');

//const config = require('../config/config');

// create jwt token

const createToken = async(data)=>{
    try {
        
             const token = await jwt.sign(data.toJSON(),"1234");
             return token;
    }catch (error) {
        console.log(error)
        response.status(400).send(error);
    }
}
// encrypt password using bcrypt

const encryptPassword = async(password)=>{
    try {
        const hashPassword = await bcrypt.hash(password,10);
        return hashPassword;
        
    } catch (error) {
        response.status(400).send(error.message);
        
    }
}
const registerUser = async(request,response)=>{
    try {
        const hashPassword = await encryptPassword(request.body.password);
            const userDetails = new User({
                name : request.body.name,
                email : request.body.email,
                password :hashPassword,
                mobile : request.body.mobile,
                type : request.body.type,
                imageName : request.file.filename,
                imagePath : request.file.path
            });
            const isUserExists = await User.findOne({'email' : request.body.email});
            if(isUserExists){
                response.status(200).json({
                    message : "Email already exists",
                    success : false,
                })
            }
            else{
                const dataRes = await userDetails.save();
                response.status(200).json({
                    message : "user registered successfully",
                    success : true,
                    data : dataRes
                })
            }
    } catch (error) {
        response.status(400).send(error.message);
        
    }



}

// login user

const loginUser = async(request,response)=>{
   try {
        const email = request.body.email;
        const password = request.body.password;
        //check whether user email exists or not
        const dataResult = await User.findOne({'email' : email});
        if(dataResult){
            //check password match or not
            const isPasswordMatch = await bcrypt.compare(password,dataResult.password);
            if(isPasswordMatch){
                const token = await createToken(dataResult);
                response.status(200).json({
                    messsage : "user login",
                    success :true,
                    token : token
                })
            }else{
                response.status(404).json({
                    message : "incorrect username or password",
                    success : false
                })
            }
        }else{
            response.status(404).json({
                message:"incorrect username or passsword",
                success : false
            })
        }
        
   } catch (error) {
    response.status(400).send(error.message);
   }
}
module.exports = {
    registerUser,
    loginUser
}