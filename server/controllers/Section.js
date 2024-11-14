const Section = require("../models/Section");
const Course = require("../models/Course");
const { findByIdAndUpdate } = require("../models/User");


exports.createSection =async(req,res)=>{
    try{
        //data fetch
        //validation
        //section create
        //course mein section ki object id push kar do
        const {sectionName,courseId} = req.body;
        if(!sectionName || ! courseId){
            return res.status(400).json({
                success:false,
                message: "Missing",
            });
        }
        const newSection = await Section.create({
            sectionName
        });
        const updatedCourseDetails= await Course.findByIdAndUpdate(courseId,{
         $push:{
            courseContent: newSection._id,
         }},{new:true}  ,
        );
        //use populate and subsections

        


        return res.status(200).json({
            success:true,
            message: "Section created successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create Section plz try again",
            error:error.message,

        });


    }
}
exports.updateSection = async(req,res)=>{
    try{
     const {sectionName,sectionId}= req.body;
    
     if(!sectionName || ! sectionId){
         return res.status(400).json({
             success:false,
             message: "Missing",
         });
     }
     const section = await Section.findByIdAndUpdate(
        {sectionId},
        {sectionName},
        {
            new:true
        }

     );
     return res.status(500).json({
        success:true,
        message: "section upadated successfully",
    });


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "Unable to update",
        });

    }
    
}
exports.deleteSection = async(req,res)=>{
    try{
        const {sectionId}=req.params
        await Section.findByIdAndDelete(sectionId);
        //testing mein dekhenge object id deletion in coursecontent
      



 return res.status(200).json({
            success:true,
             message:"deleted Successfully",
        });

    }

    catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section",
            error:err.message,

        });

    }

        
}