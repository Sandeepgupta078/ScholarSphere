const Category = require("../models/Category");


// handler function of create category
exports.createCategory  =async(req,res)=>{
    try{
        // fetch data from req body
        const {name,description} = req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        // create entry in database
        const CategoryDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(CategoryDetails);
        // return response
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:message.error,
        })
    }
}

// getAllCategory
exports.showAllCategories = async(req,res)=>{
    try{
        const allCategory = await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"All Category returned successfully",
            allCategory,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"something error while returning the tags"
        })
    }
}

// category page details 
exports.categoryPageDetails = async(req,res)=>{
    try{
        // get category id
        const {categoryId} = req.body;
        // get courses for specified cateory_id
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            });
        }
        // get courses for different categories
        const differentCategories = await Category.find({
            _id:{$ne:categoryId},
        }).populate("courses").exec();
        
        // get top selling courses - do self

        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            },
        });
 

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}