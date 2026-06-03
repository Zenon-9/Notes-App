import User from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Helper function to find a user by email
const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }
        if (await findUserByEmail(email)) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


