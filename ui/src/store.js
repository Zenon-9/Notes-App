import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./features/Notes/noteSlice";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
});