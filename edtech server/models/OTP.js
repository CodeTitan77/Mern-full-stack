const mongoose=require("mongoose");
const OTPSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true,

    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.Now(),
        expires:5*60,

    },
   
});

