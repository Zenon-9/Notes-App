import {
    getAllUsers,
    getUserById,
} from '../controllers/adminController.js';

import express from 'express';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

export default router;