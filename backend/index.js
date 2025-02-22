import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://team-pumpkin-assignment.vercel.app", 
        methods: ["GET", "POST"],
    }
});

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg);
        io.emit('chat message', msg);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

server.listen(8080, () => {
    console.log('Server is running: http://localhost:8080');
})