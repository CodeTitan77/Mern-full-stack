const jwt = require("jsonwebtoken");
require("dotenv").config();
const User= require("../models/User");

//auth
exports.auth = async(req,res,next)=>{
    try{
        const token = req.cookies.token 
                     || req.body.token
                     ||req.header("Authorization").replace("Bearer","");
        if(!token)  {
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        } 
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode); // its return value is a payload
            req.user= decode;

        } 
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
    
            })

        }   
        next();   
     
       


    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something wemt wrong while validating ",

        })

    }
}

exports.isStudent = async(req,res,next)=>{
    try{
       if(req.user.accountType!=="Student"){
        return res.status(401).json({
            success:false,
            message:"this is protected route for students only"
        });
       }
     
       next();


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cant be verified ",

        })

    }
}