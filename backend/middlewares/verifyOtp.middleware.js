import { OTP } from "../models/otp.model.js";

const verifyOtp = async (req, res, next) => {
    const {email, otp} = req.body;
    try{
        const isOtp = await OTP.findOne({email, otp});
        if(isOtp){
           await next();
        }else{
            res.status(401).send({message: "Invalid OTP, Try sending again"});
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }
};
export default verifyOtp;