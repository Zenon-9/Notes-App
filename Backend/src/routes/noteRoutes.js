import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById
} from '../controllers/noteController.js';
import auth from '../middleware/auth.js';

import express from 'express';

const router = express.Router();

// Apply auth middleware to protect all note routes
router.use(auth);

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNoteById);
router.delete('/:id', deleteNoteById);

export default router;