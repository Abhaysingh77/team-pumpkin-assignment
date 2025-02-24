import { Router } from "express";
import getAllUsers from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
const router = Router();

router.get('/all', verifyToken, getAllUsers);

export default router

