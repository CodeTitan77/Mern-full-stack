
const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const {uploadImageToCloudinary}= require("../utils/imageUploader");

//create Subsection

exports.createSubSection= async(req,res)=>{
    try{
        //fetch data
        //extract file and validation
        //cloudinary upload
        //create a sub section
        //update section by putting subsection objectId


        const {sectionId, title,description,timeDuration}=req.body;
        const video =req.files.videoFile;

        if(!sectionId||!title||!description||!timeDuration){
            return res.status(400).json({
                success:false,
                message:"All fields are required",

            });
        }
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const subSectionDetails= await Subsection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,

        })
        const updatedSection= await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id,
                }
            },
            {new:true}
        );
        return res.status(200).json({
            success:true,
            message:'Sub Section created Successfully',
            updatedSection,

        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,

        })

    }
}
// update Subsection hw 
//delete subsection