const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// reset Password token
exports.resetPasswordToken = async(req,res)=>{
    try{
        // get email from req body
        const email = req.body.email;
        // check user for this email,email validation
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Your E-mail is not registered with us"
            });
        }
        // generate token
        const Token = crypto.randomUUID();
        // update user by adding token and expiration time
        const updatedDetails  = await User.findOneAndUpdate({email:email},{
            token:token,
            resetPasswordExpires:Date.now()+5*60*1000,
        },{new:true});
        // create url
        const url = `http://localhost:3000/update-password/${token}`
        // send mail containing the url
        await mailSender(email,"Password Reset Link",`Password Reset Link:${url}`);
        // return response
        return res.status(200).json({
            success:true,
            message:"Email sent Successfully,please check email and change password"
        })
     
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending reset password"
        })
    }
}

// reset password

exports.resetPassword = async(req,res)=>{
    try{
        // data fetch
        const {password,confirmPassword,token} = req.body;
        // validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password do not match",
            });
        }
        // get user details from db using token
        const userDetails = await User.findOne({token:token});
        // if no entry-invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is Invalid",
            });
        }
        // token time check
        if( userDetails.resetPasswordExpires<Date.now()){
            return res.json({
                success:false,
                message:"Token is expired ,please regenrate your token"
            });

        }
        // hashed password
        const hashedPassword = await bcrypt.hash(password,10);
        // update password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        // return response
        return res.status(200).json({
            success:true,
            message:"Password Reset Sucessfully"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:""
        })
    }
}