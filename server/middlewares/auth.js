const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req,res,next)=>{
    try{
        //extract token

        const token =req.cookies.token|| req.body.token|| req.header("Authorization").replace("Bearer ","");
     if(!token){
        return res.status(401).json({
            success:false,
            message:'Token is missing',
        });
     }
     // verify the token
     try{
        const decode =  jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;

     }
     catch(err){
        return res.status(401).json({
            success:false,
            message:'token is invalid',
        });
     }

  next();

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'something went wrong while validating token',
        });


    }
}
exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:'this is for students only',
            });
            

        }


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verifies',
        });


    }
}
exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:'this is for instructor only',
            });
            

        }


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verifies',
        });


    }
}
exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:'this is for Admin only',
            });
            

        }


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verifies',
        });


    }
}