import Message from "../models/message.model.js";
export const chatSocket = (io) => {
    let onlineUsers = new Map();

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // When a user comes online, store their socket ID
        socket.on("user-online", async (userId) => {
            onlineUsers.set(userId, socket.id);
            io.emit("online-users", Array.from(onlineUsers.keys())); 
        
            try {
                const messages = await Message.find({
                    $or: [{ senderId: userId }, { receiverId: userId }]
                }).sort({ timestamp: 1 });
        
                console.log(`Sending stored messages to ${userId}:`, messages);
        
                // Send stored messages only to the specific user
                socket.emit("stored-messages", messages);
            } catch (error) {
                console.error("Error fetching stored messages:", error);
            }
        });
        
        

        // Handle private messaging with rooms
        socket.on("join-room", ({ senderId, receiverId }) => {
            const room = [senderId, receiverId].sort().join("-");
            socket.join(room);
            console.log(`User ${senderId} joined room: ${room}`);
            io.to(room).emit("room-joined", { room, senderId });
        });
        

        socket.on("send-message", async({ senderId, receiverId, message }) => {
            const room = [senderId, receiverId].sort().join("-");
            console.log(`Sending message from ${senderId} to ${receiverId} in room ${room}: ${message}`);
        
            const newMessage = new Message({
                senderId,
                receiverId,
                message,
                timestamp: new Date()
            });
            await newMessage.save();

            io.to(room).emit("receive-message", { senderId, receiverId, message });
        });
        
        

        // Handle disconnection and remove user from online list
        socket.on("disconnect", () => {
            const userId = [...onlineUsers.entries()].find(([_, id]) => id === socket.id)?.[0];
            if (userId) {
                onlineUsers.delete(userId);
                io.emit("online-users", Array.from(onlineUsers.keys()));
            }
            console.log("User disconnected:", socket.id);
        });
    });
};
