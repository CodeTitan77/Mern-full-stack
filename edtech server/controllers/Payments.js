const {instance}=require( "../config/razorpay");
const Course= require("../models?Course");
const User = require("../models/User");
const mailSender= require("../utils/mailSender");
const {courseEnrollmentEmail}= require("../mail/tempates/courseEnrollmentEmail");
 exports.capturePayment = async(req,res)=>{
    //get course id and user Id,
    const {course_id}= req.body;
    const userId= req.user.id;
    if(!course_id){
         return res.json({
            success:false,
            message:"Please provide valid course ID",
         })
    };
    let course;
    try{
  course= await Course.findById(course_id);
  if(!course){
    return res.json({
        success:false,
        message:"Could not find the course",
     });
   }
   const uid= new mongoose.Types.ObjectId(userId);
   if(course.studentsEnrolled.includes(uid)){
    return res.json({
        success:true,
        message:"Student is already enrolled",
     });


   }


   //user already pay for the same course
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }


     //create order
    const amount = course.price;
    const currency= "INR";
    const options= {
        amount:amount* 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };
    //return response
    try{
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,

        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order",
        })

    }



 

 };
 exports.verifySignature= async(req,res)=>{

    //enroll the guy in course if payment got successful
    const webhookSecret= "12345678";// will get this server secret
    const signature= req.headers("x-razorpay-signature");
    const shasum= crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest= shasum.digest("hex");
    if(signature===digest){
        console.log("payment is Authorized");
        const {courseId,userId}= req

    }

 }