const User =require("../models/User");
const mailSender= require("../utils/mailSender");
const bcrypt =require("bcrypt");

//reset Password token .. token used as a search parameter
exports.resetPasswordToken= async(req,res)=>{
    //get email check validation
    //link generate
    //generate token
    //update user by adding token and expiration time
    //create url
    //send mail containing url
    //return response
    try{
        const email =req.body.email;
    const user =await User.findOne({email:email});
    if(!user){
        return res.status(404).json({
            success:false,
            message:'Your email is not registered'

        });
    }

 const token = crypto.randomUUID();
 const updatedDetails = await User.findOneAndUpdate({email:email},
    {
        
            token: token,
            resetPasswordExpires: Date.now()+ 5*60*1000,

        
    },{new:true});
 


    const url=`http://localhost:3000/update-password/${token}`;

    await mailSender(email,"Password Reset Link",`Password reset link : ${url}`);
    return res.json({
        success:false,
        message:'Email sent successfully and check email'
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })

    }

}
exports.resetPassword= async(req,res)=>{
    try{
        //token validation
    //get userdetails from db
    //hash password
    //update password

    const {token,password,confirmPassword}=req.body;//frontend dalega token ko body mein
    if(password!==confirmPassword){
        return res.json({
            success:false,
            message:'Password not matching',
        });

    }
    const userDetails= await User.findOne({token:token});
    if(!userDetails){
        return res.json({
            success:false,
            message:'Token is invalid',

        });
    }
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.json({
            success:false,
            message:'plz regenerate your token',
        });

    }
    const hashedPassword =await bcrypt.hash(password,10);
    await User.findOneAndUpdate({token:token},{
        password:hashedPassword,
    },{new:true});

     return res.status(200).json({
            success:true,
            message:'Password reset successful',
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:'Password not updated',
        })
    }


}
