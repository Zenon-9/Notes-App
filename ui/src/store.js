import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./features/notes/noteSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        auth: authReducer,
    },
});