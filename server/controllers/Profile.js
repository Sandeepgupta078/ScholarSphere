const Profile = require("../models/Profile");
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/FileUploader")

exports.updateProfile = async(req,res)=>{
    try{
        // get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        // get userID
        const id = req.user.id;
        // validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        // find profile
        const userDetails = await User.findById(id);
        const ProfileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(ProfileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        // save in db
        await profileDetails.save();
        // response
        return res.status(200).json({
            success:true,
            message:"profile Updated Successfully",
            profileDetails,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"something error in updating profile",
            error:error.message,
        })
    }
}

// delete account
// explore-> how can we schedule that account deleted after some days
exports.deleteAccount = async(req,res)=>{
    try{
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not found",
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // todo :unenroll users from enroll courses
        // delete user
        await User.findByIdAndDelete({_id:id});
        // return response
        return res.status(200).json({
            success:true,
            message:"User Deleted successfully"
        });
        

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error in deleting user id",
            error:error.message,
        });
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
        // get id
        const id = req.user.id;
        // validation and user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"user data fetched successfully",
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error while fetching the user request",
            error:error.message,
        });
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};