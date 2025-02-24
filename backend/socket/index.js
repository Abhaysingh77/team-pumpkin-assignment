export const chatSocket = (io) => {
    let onlineUsers = new Map();

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // When a user comes online, store their socket ID
        socket.on("user-online", (userId) => {
            onlineUsers.set(userId, socket.id);
            io.emit("online-users", Array.from(onlineUsers.keys())); // Broadcast updated list
        });
        

        // Handle private messaging with rooms
        socket.on("join-room", ({ senderId, receiverId }) => {
            const room = [senderId, receiverId].sort().join("-");
            socket.join(room);
            console.log(`User ${senderId} joined room: ${room}`);
            io.to(room).emit("room-joined", { room, senderId });
        });
        

        socket.on("send-message", ({ senderId, receiverId, message }) => {
            const room = [senderId, receiverId].sort().join("-");
            console.log(`Sending message from ${senderId} to ${receiverId} in room ${room}: ${message}`);
        
            io.to(room).emit("receive-message", { senderId, receiverId, message });
        });
        
        

        // Handle disconnection and remove user from online list
        socket.on("disconnect", () => {
            const userId = [...onlineUsers.entries()].find(([_, id]) => id === socket.id)?.[0];
            if (userId) {
                onlineUsers.delete(userId);
                io.emit("online-users", Array.from(onlineUsers.keys())); // Update online users
            }
            console.log("User disconnected:", socket.id);
        });
    });
};
