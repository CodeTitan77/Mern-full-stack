const RatingAndReview= require("../models/RatingAndReview");
const Course= require("../models/Course");
exports.createRating= async(req,res)=>{
    //get userid
    //get courseId
    //check if user already enrolled
    //check if user not already reviewed 
    //update course with this rating/review
    //return response
    try{
        const userId= req.user.id;//fetching from payload
        const {rating,review,courseId}=req.body;
        const courseDetails= await Course.findOne(
            {
            _id:courseId,
            studentsEnrolled:{$elemMatch:{$eq:userId}},
        });
        // can use $in query as well of mongodb
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        // check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'Course is already reviewed by the user',
            });

        }
        const ratingReview= await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,
        })
        const updatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                ratingAndReviews:ratingReview._id,
            }


        },{new:true});
        console.log(updatedCourseDetails);
        return res.status(200).json({
            success:true,
            message:'rating and review created successfully',
            ratingReview,
        });



    }
    catch(error){
        console.log(error);
        return  res.status(500).json({
            success:false,
            message:error.message,
        });


    }
}

exports.getAverageRating= async(req,res)=>{
    try{
        //get course id
        const courseId= req.body.courseId;

        //find rating
        const result= await RatingAndReview.aggregate([
            {
            $match:{
                course: new mongoose.Types.ObjectId(courseId),//coursei was string here needed to be converted into objectID
            }},
            {
                $group:{
                    _id:null,
                    averageRating: {
                        $avg:"$rating"
                    },

                }
            }
        ]);
        //return rating
        if(result.length>0){
            return  res.status(200).json({
                success:true,
               
                averageRating:result[0].averageRating,
            });

        }
        return  res.status(200).json({
            success:true,
            message:"No ratings givern",
            averageRating:0,
        });


    }
    catch(error){
        return  res.status(500).json({
            success:false,
            message:error.message,
          
        });

    }

}
//get allRatingAndReviews
exports.getAllRating = async(req,res)=>{
    try{
        const allReviews= await RatingAndReview.find({}).sort({rating:"desc"}).populate({
            path:"user",
            select:"firstName lastName email image",
        })
        .populate(
            {
                path:"course",
                select:"courseName ",

            }
        ).exec();
        return  res.status(200).json({
            success:true,
            message:"All reviews fetched",
           data: allReviews,
        });

    }
    catch(error){
        return  res.status(500).json({
            success:false,
            message:error.message,
          
        });



    }
}