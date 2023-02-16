const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req,fileInfo,cb)=>{
        cb(null,'./storage/images',(err,success)=>{
            if(err) throw err;
        });
    },
    filename : (req,fileInfo,cb)=>{
        const profile_name = Date.now()+'-'+fileInfo.originalname;
        cb(null,profile_name,(err,success)=>{
            if(err) throw err;
        })
    }
});

const multipart = multer({
    storage : storage
}).single('image');

module.exports = multipart;