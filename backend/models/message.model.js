import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    delivered: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Message", messageSchema);
