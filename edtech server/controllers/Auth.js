const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile =require("../models/Profile")
const otpGenerator= require("otp-generator");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");

require("dotenv").config();


//sendOTP
exports.sendOTP =async(req,res)=>{
    try{
        const {email}=req.body;
    const checkUserPresent =await User.findOne({email});
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:'User already registered',
        })
    

    }

    
    var otp = otpGenerator.generate(6,{
        upperCaseAlphabets :false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    console.log("Otp generated",OTP);
    //check unique otp
    let result = await OTP.findOne({otp:otp});
    while(result){
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets :false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
         result = await OTP.findOne({otp:otp});

    }
    const otpPayload= {email,otp};
    //create an entry in DB

    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
    res.status(200).json({
        success:true,
        message:'OTP sent Successfully',
        otp,

    })
}
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }



    
    

    

}
exports.signup=async(req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,confirmPassword,
            accountType,
            contactNumber,otp
        }=req.body;
        if(!firstName||!lastName||!email||!password||!confirmPassword||
            !accountType||
            !contactNumber||!otp){
                return res.status(402).json({
                    success:false,
                    message:"All fields are required",
                })
            }
            if(password!==confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"Password and confirm password does not match",
                });
            }
    
            const existingUser =await User.findOne({email});
            if(existingUser){
                return res.status(400).json({
                    success:false,
                    message:"User already registered",
                });
    
            }
            const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
            if(recentOtp.length()==0){
               return  res.status(400).json({
                    success:false,
                    message:"OTP not found",
                
    
                })
                
            }
            else if(otp!==recentOtp.otp){
                return  res.status(400).json({
                    success:false,
                    message:"OTP not matching",
                
    
                })
    
            }
            const hashedPassword =await bcrypt.hash(password,10);
            //create entry in DB
            const profileDetails =await Profile.create({
                gender:null,
                dateOfBirth:null,
                email,
                about:null,
                contactNumber:null,
    
            });
    
            const user = await User.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                accountType,
                additionalDetails:profileDetails._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    
    
            })
           return res.status(200).json({
                success:true,
                message:'User is registered successfully',
                user,
            });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User cant be registered successfully',
            
        });

    }

}

exports.login =async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:'All fields are required'
            });

        }
        const user =await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registered'
            });
        }
            //password matching
            if(await bcrypt.compare(password,user.password)){
                const payload = {
                    email:user.email,
                    id:user._id,
                    accountType:user.accountType,
                }
                const token=jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"2h",
                });

                user.token=token;
                user.password=undefined;

                //create cookie and send response
                const options ={
                    expires: new Date(Date.now()+ 3*24*60*60*1000),
                    httpOnly:true,
                }
                res.cookie("token",token,options).status(200).json({
                    success:true,
                    token,
                    user,
                })


            }
            else{
                return res.status(401).json({
                    success:false,
                    message:'Password is incorrect',
                });
            }

        }


    
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failure',
        });


    }


}




