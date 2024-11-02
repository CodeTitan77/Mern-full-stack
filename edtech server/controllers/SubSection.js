
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
    }
}