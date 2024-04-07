const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// create rating
exports.createRating = async(req,res)=>{
    try{
        // get user id 
        const userId = req.user.id;
        // fetch data from req body
        const {rating,review,courseId} = req.body;
        // check user is enrolled or not
        const courseDetails = await Course.findOne({
            _id:courseId,
            studentsEnrolled:{$elemMatch: {$eq:userId} },
        });
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'student is not enrolled in the course',
            })
        }
        // check user already reviewed the course or not
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"course is already reviewed by the user",
            })
        }
        // create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,
        });
        // update course with this rating review
        const updatedCourseDetails =  await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id,
                }
            },{new:true});
            console.log(updatedCourseDetails);
        // return response
        return res.status(200).json({
            success:true,
            message:"rating and reviewed updated successfully",
            ratingReview,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// get Average rating
exports.getAverageRating = async (req,res)=>{
    try{
        // get course id
        const courseId = req.body.courseId;
        // calculate average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ]);
        // return  rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        // if no rating and reviews exist
        return res.status(200).json({
            success:true,
            message:"Average rating in 0,no ratings given till now",
            averageRating:0,

        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// get all rating and reviews
exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({}).sort({rating:"desc"}).populate({
            path:"User",
            select:"firstName lastName image email"
        })
        .populate({
            path:"Course",
            select:"courseName",
        })
        .exec();

    return res.status(200).json({
        success:true,
        message:"all reviews fetched successfully"
    });
                                                                     

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// hw: get all rating review specific to courses