import UserRoutes from './routes/userRoutes.js';
import NoteRoutes from './routes/noteRoutes.js';
import AdminRoutes from './routes/adminRoutes.js';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/notes", NoteRoutes);
app.use("/admin", AdminRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Notes App API');
});

export default app;