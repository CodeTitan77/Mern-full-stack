const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
exports.categoryPageDetails= async(req,res)=>{
    try{
        const {categoryId}= req.body;
         const selectedCategory= await Category.findById(categoryId).populate("courses").exec();
         if(!selectedCategory){
            return res.status(500).json({
                success: false,
                message: "Data not found",
            });
         }
         const differentCategories= await Category.find({
            _id:{$ne:categoryId},
         }).populate("courses").exec();

         //get top selling course
         return res.status(200).json({
            success: true,
            message: "Data  found",
            data:{
                selectedCategory,differentCategories
            },
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
           
        });

    }

}