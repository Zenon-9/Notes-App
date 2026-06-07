import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiPlus, FiTrash2, FiArchive, FiEdit2, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";

import { setNotes, deleteNote } from "./noteSlice";
import NoteService from "./noteService";
import "./Notes.css";

function NoteCardList() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();

    // Check if the current view is for active notes or archived notes
    const queryParams = new URLSearchParams(location.search);
    const isArchiveTab = queryParams.get("tab") === "archive";

    const notes = useSelector((state) => state.notes.notes);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await NoteService.getNotes(isArchiveTab);
                dispatch(setNotes(res));
            } catch (err) {
                toast.error("Failed to fetch notes.");
                console.error(err);
            }
        };

        getNotes();
    }, [dispatch, isArchiveTab]);

    const handleArchive = async (note, e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const newArchiveState = !note.isArchived;
        try {
            await NoteService.updateNote(note._id, { isArchived: newArchiveState });
            dispatch(deleteNote(note._id)); // Remove from current local state list
            toast.success(newArchiveState ? "Note archived successfully." : "Note unarchived successfully.");
        } catch (err) {
            toast.error("Failed to update note status.");
            console.error(err);
        }
    };

    const handleDelete = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to permanently delete this note?")) {
            return;
        }

        try {
            await NoteService.deleteNote(id);
            dispatch(deleteNote(id));
            toast.success("Note deleted successfully.");
        } catch (err) {
            toast.error("Failed to delete note.");
            console.error(err);
        }
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        (note.content && note.content.toLowerCase().includes(query.toLowerCase()))
    );

    // Format date string
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="notes-container">
            <div className="notes-header">
                <div className="notes-title-section">
                    <h1 className="notes-title">
                        {isArchiveTab ? "Archived Notes" : "My Notes"}
                    </h1>
                    <span className="notes-badge">
                        {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
                    </span>
                </div>

                <div className="notes-actions">
                    <div className="search-wrapper">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="search-input"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    {!isArchiveTab && (
                        <Link to="/note/new" className="create-btn">
                            <FiPlus /> New Note
                        </Link>
                    )}
                </div>
            </div>

            <div className="notes-grid">
                {filteredNotes.length === 0 ? (
                    <div className="empty-notes-container">
                        <FiFileText className="empty-icon" />
                        <h2 className="empty-title">
                            {query ? "No search results" : isArchiveTab ? "No archived notes" : "Your board is empty"}
                        </h2>
                        <p className="empty-desc">
                            {query 
                                ? "Try looking for different keywords or clear the search input." 
                                : isArchiveTab 
                                ? "Notes you archive will show up here. They won't clutter your main notes list." 
                                : "Start capturing your ideas, sketches, and checklists today."
                            }
                        </p>
                        {!isArchiveTab && !query && (
                            <Link to="/note/new" className="empty-btn">
                                <FiPlus /> Write Your First Note
                            </Link>
                        )}
                    </div>
                ) : (
                    filteredNotes.map((note) => (
                        <div key={note._id} className="note-card-wrapper">
                            <Link
                                to={`/note/${note._id}`}
                                className="note-card-link"
                            >
                                <h2 className="note-card-title">{note.title}</h2>
                                <p className="note-card-content">
                                    {note.content && note.content.length > 180
                                        ? note.content.substring(0, 180) + "..."
                                        : note.content || "Empty content"}
                                </p>
                                <div className="note-card-footer">
                                    <span className="note-card-date">
                                        {formatDate(note.updatedAt)}
                                    </span>
                                </div>
                            </Link>

                            <div className="note-card-actions">
                                <Link 
                                    to={`/note/${note._id}`} 
                                    className="card-action-btn edit" 
                                    title="Edit Note"
                                >
                                    <FiEdit2 />
                                </Link>
                                <button 
                                    className="card-action-btn archive" 
                                    onClick={(e) => handleArchive(note, e)}
                                    title={note.isArchived ? "Unarchive Note" : "Archive Note"}
                                >
                                    <FiArchive />
                                </button>
                                <button 
                                    className="card-action-btn delete" 
                                    onClick={(e) => handleDelete(note._id, e)}
                                    title="Delete Note"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default NoteCardList;
