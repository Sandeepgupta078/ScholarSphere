const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth = async(req,res,next)=>{
    try{
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        // if token missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }
        // verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(error){
            // verification issues
            return res.status(401).json({
                success:false,
                message:"token is missing",
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        });
    }
}

// student
exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Student only"
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role can not be verified,please try again "
        })
    }
}

// Instructor
exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for Instructor only",
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role can not be Verified,please try again",
        })
    }
}

// admin
exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for user only",
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role can not be verified,please try again",
        })
    }
}