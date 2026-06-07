import UserRoutes from './routes/userRoutes.js';
import NoteRoutes from './routes/noteRoutes.js';
import AdminRoutes from './routes/adminRoutes.js';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { requestLogger, errorLogger } from './middleware/logger.js';
import { globalLimiter, authLimiter } from './middleware/rateLimiter.js';

const app = express();

// Apply request logger and global rate limiter early in the middleware chain
app.use(requestLogger);
app.use(globalLimiter);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Apply stricter rate limits to authentication routes
app.use("/api/users", authLimiter, UserRoutes);
app.use("/api/notes", NoteRoutes);
app.use("/api/admin", AdminRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Notes App API');
});

// Centralized error logging and response handling
app.use(errorLogger);
app.use((err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
        message: err.message || 'Internal Server Error'
    });
});

export default app;