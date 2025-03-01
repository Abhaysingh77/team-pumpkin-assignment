import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { chatSocket } from './socket/index.js';

dotenv.config();

const app = express();
const server = createServer(app);
app.use(express.json());

// Enable CORS for Express
app.use(cors({
    origin: "*",  // Allow all origins (for testing, later restrict to specific domains)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: "*",  // Allow all origins (change later for security)
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
});


connectDb().then(() => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
});

chatSocket(io);

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running: http://localhost:${process.env.PORT || 8080}`);
});

