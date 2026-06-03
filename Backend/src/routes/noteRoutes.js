import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById
} from '../controllers/noteController.js';

import express from 'express';

const router = express.Router();

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNoteById);
router.delete('/:id', deleteNoteById);

export default router;