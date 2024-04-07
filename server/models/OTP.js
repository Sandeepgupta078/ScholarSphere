const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*60,
    }
});

// function -> TO SEND EMAIL
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Email from StudyNotion",emailTemplate(otp));
        console.log("Email send Successfully: ",mailResponse);
    }catch(error){
        console.log("error occured while sending email: ",error);
        throw error;
    }
}
// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP",OTPSchema);