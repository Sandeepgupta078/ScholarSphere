const { isInstructor } = require("../middlewares/auth");
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/FileUploader");

// create course handler function
exports.createCourse = async(req,res)=>{
    try{
        // fetch data
        const{courseName,courseDescription,whatYouWillLearn,price,Category} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !Category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById({userId});
        console.log("Instructor Details:",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor Details not found",
            });
        }
        // check given tag is valid or not
        const CategoryDetails = await Category.findById({Category});
        if(!CategoryDetails){
            return res.status(400).json({
                success:false,
                message:"Category details not found",
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // CREATE an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            Category:CategoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        // add the new course to the user schema of instuctor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )
        // update tag schema

        // return response
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to creating course",
            error:error.message,
        })
    }
};

// get all course handler function

exports.getAllCourses = async(req,res)=>{
    try{
        const allCourses = await Course.find({},
            {
                courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReviews:true,
                studentsEnrolled:true,
            }
        ).populate("Instructor").exec();

        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched Successfully",
            data:allCourses,
        })
8
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"cannot fetch course data",
            error:error.message,
        })
    }
}

// get courses details
exports.getCourseDetails = async (req,res)=>{
    try{
        // get id 
        const {courseId} = req.body;
        // find course details
        const courseDetails  = await Course.find(
            {_id:courseId}.populate(
                {
                    path:"instructor",
                    populate:{
                        path:"additionalDetails",
                    }
                }
            )
            .populate("category")
            .populate("ratingAndreviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                },
            })
            
        )
        .exec();
        // validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`could not find the course with ${courseId}`,
            });
        }
        // return response 
        return res.status(200).json({
            success:false,
            message:"course details fetched successfully",
            data:courseDetails,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}