import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import rideRoutes from './routes/rideRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/admin', adminRoutes);

// Socket.io — Real-time Driver Location
io.on('connection', (socket) => {
    console.log(`⚡ Socket connected: ${socket.id}`);

    // Driver location update பண்றது
    socket.on('driver:location', (data) => {
        // Passenger-க்கு driver location அனுப்புறோம்
        io.to(data.rideId).emit('driver:locationUpdate', {
            lat: data.lat,
            lng: data.lng
        });
    });

    // Ride room-ல join பண்றது
    socket.on('join:ride', (rideId) => {
        socket.join(rideId);
        console.log(`User joined ride room: ${rideId}`);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

export { io };