import Note from '../models/note.js';

// Create a new note
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required.' });
        }
        const newNote = new Note({ 
            title, 
            content, 
            user: req.user.id 
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all notes for the authenticated user
export const getAllNotes = async (req, res) => {
    try {
        const isArchived = req.query.isArchived === 'true';
        const notes = await Note.find({ 
            user: req.user.id, 
            isArchived 
        }).sort({ updatedAt: -1 }); // Sort by newest updated notes first
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a note by ID (user-scoped)
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        });
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a note by ID (user-scoped)
export const updateNoteById = async (req, res) => {
    try {
        const { title, content, isArchived } = req.body;
        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (content !== undefined) updateFields.content = content;
        if (isArchived !== undefined) updateFields.isArchived = isArchived;

        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            updateFields,
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a note by ID (user-scoped)
export const deleteNoteById = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user.id 
        });
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};