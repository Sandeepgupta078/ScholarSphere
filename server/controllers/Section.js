const Section = require("../models/Section");
const Course =  require("../models/Course");

exports.createSection = async(req,res)=>{
    try{
        // data fetch 
        const {sectionName,courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Mising Properties",
            });
        }
        // create section
        const newSection = await Section.create({sectionName});
        // update course with section object ID 
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                },
               
            },
            {new:true},
        );
        // hw:use populate to replace section/subsection both in the description

        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"unable to creating section,try agian",
            error:error.message,
            
        })

    }
}


// updating section
exports.updateSection = async(req,res)=>{
    try{
        // data fetch
        const {sectionName,sectionId} = req.body;
        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Mising Properties",
            });
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        // return res
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to updating the section",
            error:error.message,
        });
    }
}

// delete section
exports.deleteSection = async(req,res)=>{
    try{
        // get ID-assumin that we are sending id in params
        const {sectionId} = req.params;
        // use findbyIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        // todo:do we need to delete the entry from courseSchema
        // return res
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete the section,please try again",
            error:error.message,
        });
    }
}
