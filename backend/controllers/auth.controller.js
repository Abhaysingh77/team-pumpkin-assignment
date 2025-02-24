import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
const authController = {
   
    login: async (req, res) => {
        const { email } = req.body;
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User not found. Please register first." });
            }

            res.status(200).json({ message: "User logged in successfully", user, token });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

   
    register: async (req, res) => {
        const { name, email, phone } = req.body;

        try {
            const isUserExists = await User.findOne({ email });

            if (isUserExists) {
                return res.status(400).json({ message: "User already exists. Please login." });
            }

            const newUser = new User({ name, email, phone });

            await newUser.save();
            res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
};

export default authController;
