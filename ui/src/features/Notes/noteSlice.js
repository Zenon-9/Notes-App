import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: [],
};

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => { state.notes = action.payload; }
    },
});

export const { setNotes } = noteSlice.actions;
export default noteSlice.reducer;