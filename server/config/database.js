const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then( ()=>console.log("Database connection successfull"))
    .catch( (error)=>{
        console.log("Database connection Failed");
        console.error(error);
        process.exit(1);
    })
};