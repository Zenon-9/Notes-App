import { useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "./noteSlice";
import NoteService from "../../services/noteService";
import "./note.css";

function Notes() {
    const dispatch = useDispatch();

    const notes = useSelector((state) => state.notes.notes);

    useEffect(() => {
        const getNotes = async () => {
            const res = await NoteService.getNotes();

            dispatch(setNotes(res));
        };
        getNotes();
    }, [dispatch]);

    return (
        <div className="notes-container">
            <h1 className="notes-title">My Notes</h1>
            <hr />

            <div className="notes-grid">
                {notes.map((note) => (
                    <div className="note-card" key={note._id}>
                        <h2>{note.title}</h2>

                        <p>{note.content}</p>

                        <span className="note-date">
                            {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;