const express = require('express');
const app = express();
app.listen(8080,()=>{
    console.log("server is running on port 8080");
});
//database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ECOM');

//require middleware
const bodyParser = require('./middleware/bodyParser');
const multipart = require('./middleware/multer');

//use middleware
app.use(bodyParser.jsonEncoder);
app.use(bodyParser.urlEncoder);
app.use(multipart);

//user route

const signupRoute = require('./routes/signup.route');
const loginRoute = require('./routes/login.route');
const auth = require('./middleware/auth');
const testRoute = require('./routes/test.route');
const userRoute = require('./routes/user.route');

app.use('/api/register',signupRoute);
app.use('/api/login',loginRoute);
app.use(auth.verifyToken);
//app.use('/api/test',testRoute);
app.use('/api/user',userRoute);
