import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import { OTP } from '../models/otp.model.js';

const sendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false });

    try {
        const isOtp = await OTP.findOne({email});
        if(isOtp){
            await OTP.findOneAndDelete({email});
        }
        await OTP.create({ email, otp });
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            }
        })

        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${otp} , Valid for 5 minutes only`
        })
        
        res.status(200).send({ message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export default sendOtp