const jwt = require('jsonwebtoken');6
const verifyToken = async(request,response,next)=>{
    const token = request.body.authToken;
    console.log(request.body)
    if(!token){
        response.status(401).json({
            message : "unauthorised user",
            success : false
        });
    }
    else{
            try {
                
                const userRes = await jwt.verify(token,"1234");
                response.status(200).json({
                    message : "token verified",
                    success : true,
                    userData : userRes
                });
                return next();

            } catch (error) {
                response.status(401).json({
                    message : "invalid token",
                    success : false
                });
            }
    }
}

module.exports = {
    verifyToken
}