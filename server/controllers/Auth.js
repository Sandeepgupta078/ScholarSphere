const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv")
.config();
const cookie = require("cookie-parser");
const Profile = require("../models/Profile");

// send otp
exports.sendOTP = async(req,res)=>{

   try{
    // fetch email from req ki body
    const {email} = req.body;

    // check if user already exist
    const checkUserPresent = await User.findOne({email});

    // if user already exist then return a response
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User already Registered"
        });
    }

    // generate otp
    var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
    console.log("OTP generated: ",otp);
    // check unique otp or not 
    const result = await OTP.findOne({otp: otp});

    while(result){
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        result = await OTP.findOne({otp: otp});
    }

    const otpPayload = {email,otp};

    // create an entry for otp
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // return response status
    res.status(200).json({
        success:true,
        message:"OTP sent Successfully",
        otp,
    })

   }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,

    })
   }
};

// signup
exports.signup = async(req,res)=>{
   
    try{
         // data fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        // validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All Fields are required",
            })
        }

        // both 2 passwords match
        if(password != confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password do not match,please try again "
            });
        }
        // check user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already Registered",
            });
        }
        // find most recent otp stored for user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("RecentOTP : ",recentOtp);
        // validate otp
        if(recentOtp.length == 0){
            // OTP not found
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            });
        }
        // Hashed Password
        const hashedPassword = await bcrypt.hash(password,10);

        // entry in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails,
            image:`https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`
        })

        // return res
        return res.status(200).json({
            success:true,
            message:"User Registered Successfully",
            user,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User can not be registered, please try again",
        })
    }
}

// login
exports.login = async (req,res)=>{
    try{
        // get data from req body
        const {email,password} = req.body;
        // validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All Fields are required, please try again",
            });
        }
        // check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            })
        }
        // generate JWT ,after password matching
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

             // create cookie and send response
        const options = {
            expires:new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged in Successfully"
        })
       }else{
        return res.status(400).json({
            success:false,
            message:"Password is incorrect",
        });          
       }
       
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failed,please try again ",
        });
    }
};
// changePassword
exports.changePassword = async(req,res)=>{
    try{
        // get data from req body
        // get oldPassword,newPassword, confirmNewPassword
        // validation
        //update password in db
        // send mail_ password updated
        // return response
    }catch(error){

    }
}

