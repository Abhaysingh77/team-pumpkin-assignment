import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: "https://team-pumpkin-assignment.vercel.app",
        methods: ["GET", "POST"],
    }
});


// app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

connectDb().then(() => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    })

    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes)

})

let onlineUsers = new Map();
io.on('connection', (socket) => {

    socket.on('user-online', (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit('online-users', Array.from(onlineUsers.keys()));
    })

    socket.on('send-message', ({ senderId, receiverId, message }) => {
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
            socket.to(receiverSocketId).emit('receive-message', { senderId, message });
        }
    })

    socket.on("disconnect", () => {
        const userId = [...onlineUsers.entries()].find(([_, id]) => id === socket.id)?.[0];
        if (userId) {
            onlineUsers.delete(userId);
            io.emit("online-users", Array.from(onlineUsers.keys())); // Update online users
        }
        console.log("User disconnected:", socket.id);
    });

})

server.listen(process.env.PORT, () => {
    console.log(`Server is running: http://localhost:${process.env.PORT}`);
})