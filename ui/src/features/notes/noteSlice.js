import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: [],
};

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => { state.notes = action.payload; },
        addNote: (state, action) => { state.notes.push(action.payload); },
        updateNote: (state, action) => {
            const index = state.notes.findIndex(note => note._id === action.payload._id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note._id !== action.payload);
        },
    },
});

export const { setNotes, addNote, updateNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
