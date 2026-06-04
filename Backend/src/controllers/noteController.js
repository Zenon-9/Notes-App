import Note from '../models/note.js';

// Create a new note
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required.' });
        }
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all notes
export const getAllNotes = async (req, res) => {
    try {
        const { isArchived } = req.query;
        const notes = await Note.find({ isArchived: isArchived || false });
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a note by ID
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a note by ID
export const updateNoteById = async (req, res) => {
    try {
        const { title, content, isArchived } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, isArchived },
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

// Delete a note by ID
export const deleteNoteById = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};