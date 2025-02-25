import { Router } from "express";
import authController from '../controllers/auth.controller.js';
import sendOtpController from "../controllers/sendOtp.controller.js";
import verifyOtp from "../middlewares/verifyOtp.middleware.js";


const router = Router();
router.post('/register', authController.register )
router.post('/login/send-otp', sendOtpController)
router.post('/login/verify-otp', verifyOtp, authController.login);

export default router;