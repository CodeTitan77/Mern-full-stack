const Course= require("../models/Course");
const Tag =require("../models/Tags");
const User= require("..models/User");
const {uploadImageToCloudinary} =require("../utils/imageUploader");
require("dotenv").config();

exports.createCourse=async(req,res)=>{
    try{
        const{courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;
        const thumbnail =req.files.thumbnailImage;
        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!tag||!thumbnail){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }
        //check for instructor

    const userId =req.user.id;
    const instructorDetails =await User.finfById(userId);
    console.log("Instructor details",instructorDetails);
    if(!instructorDetails){
        return res.status(400).json({
            success:false,
            message:"Instructor details not found",
        });

    }

    const tagDetails =await Tag.findById(tag);//note tag is id here because in schema its reference passes as objectId
    if(!tagDetails){
        return res.status(400).json({
            success:false,
            message:"Tag details not found",
        });
    }
    //cloudinary upload

    const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

    // create entry 

    const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor: instructorDetails._id,
        whatYouWillLearn: whatYouWillLearn,
        price:price,
        tag:tagDetails._id,
        thumbnail:thumbnailImage.secure_url,// secure url store
    })
    // add new course to user schema of instructor

    await User.findByIdAndUpdate({_id:instructorDetails._id},
       { $push:{
            courses:newCourse._id,
       }
        },
        {
            new:true,
        },
    );
    //update tag ka schema
    await Tag.findByIdAndUpdate({_id:tagDetails._id},{
        $push:{
            courses:newCourse._id,
        }
    },
    {
        new:true
    },);

    return res.status(200).json({
        success:true,
        message:"course created successfully",
        data:newCourse,
    });





    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });


    }
};

//get all courses handler function
exports.showAllCourses= async(req,res)=>{
    try{
        const allCourses = await Course.find({},{courseName:true,price:true,
            studentsEnrolled:true,
            instructor:true,
            ratingAndReviews:true,
            thumbnail:true,

                                                               
        }).populate("instructor").exec();

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch data',
            error:error.message,
        });

    }
}
exports.getCourseDetails= async(req,res)=>{
    try{
        const {courseId}= req.body;
        const courseDetails = await Course.find({_id:courseId}).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndreviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find course with ${courseId}`,
            });
        }
        return res.status(200).json({
            success:true,
            message:"fetched successfully",
            data:courseDetails,
        });


    }
    catch(error){
        console.log(error);
        return res.status(500),json({
            success:false,
            message:error.message,
        })

    }

}


