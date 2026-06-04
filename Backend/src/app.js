import UserRoutes from './routes/userRoutes.js';
import NoteRoutes from './routes/noteRoutes.js';
import AdminRoutes from './routes/adminRoutes.js';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

app.use("/api/users", UserRoutes);
app.use("/api/notes", NoteRoutes);
app.use("/api/admin", AdminRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Notes App API');
});

export default app;