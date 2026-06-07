import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArchive, FiTrash2, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

import NoteService from "../features/notes/noteService";
import "./NoteEditor.css";

function NoteEditor() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Check if we are editing an existing note or writing a new one
    const isEditMode = Boolean(id) && id !== "new";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isArchived, setIsArchived] = useState(false);
    const [loading, setLoading] = useState(isEditMode);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            const fetchNote = async () => {
                try {
                    setLoading(true);
                    const res = await NoteService.getNoteById(id);
                    setTitle(res.title);
                    setContent(res.content || "");
                    setIsArchived(res.isArchived || false);
                } catch (err) {
                    toast.error("Failed to load note details.");
                    console.error(err);
                    navigate("/home");
                } finally {
                    setLoading(false);
                }
            };
            fetchNote();
        } else {
            // Reset fields for a new note
            setTitle("");
            setContent("");
            setIsArchived(false);
            setLoading(false);
        }
    }, [id, isEditMode, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Note title is required.");
            return;
        }

        setSubmitting(true);
        try {
            if (isEditMode) {
                await NoteService.updateNote(id, {
                    title: title.trim(),
                    content: content.trim(),
                });
                toast.success("Note updated successfully.");
            } else {
                await NoteService.createNote({
                    title: title.trim(),
                    content: content.trim(),
                });
                toast.success("Note created successfully.");
            }
            navigate("/home");
        } catch (err) {
            toast.error("Failed to save note.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleArchiveToggle = async () => {
        if (!isEditMode) return;
        const newArchiveState = !isArchived;

        try {
            await NoteService.updateNote(id, { isArchived: newArchiveState });
            setIsArchived(newArchiveState);
            toast.success(newArchiveState ? "Note archived successfully." : "Note unarchived successfully.");
            navigate("/home");
        } catch (err) {
            toast.error("Failed to update note archive status.");
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!isEditMode) return;

        if (!window.confirm("Are you sure you want to permanently delete this note?")) {
            return;
        }

        try {
            await NoteService.deleteNote(id);
            toast.success("Note deleted successfully.");
            navigate("/home");
        } catch (err) {
            toast.error("Failed to delete note.");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="editor-loading">
                <div className="spinner"></div>
                <p>Loading note contents...</p>
            </div>
        );
    }

    return (
        <div className="note-page">
            <form className="note-form" onSubmit={handleSubmit}>
                <div className="note-form-header">
                    <button type="button" className="back-btn" onClick={() => navigate("/home")}>
                        <FiArrowLeft /> Back to board
                    </button>

                    {isEditMode && (
                        <div className="editor-actions">
                            <button
                                type="button"
                                className="editor-action-btn archive"
                                onClick={handleArchiveToggle}
                                title={isArchived ? "Unarchive Note" : "Archive Note"}
                            >
                                <FiArchive style={{ color: isArchived ? "var(--accent-secondary)" : "inherit" }} />
                            </button>
                            <button
                                type="button"
                                className="editor-action-btn delete"
                                onClick={handleDelete}
                                title="Delete Note"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    placeholder="Note Title"
                    className="title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={100}
                />

                <textarea
                    placeholder="Write your note here..."
                    className="content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={10000}
                />

                <div className="form-actions-footer">
                    <button type="submit" className="save-btn" disabled={submitting}>
                        {submitting ? (
                            <div className="spinner"></div>
                        ) : (
                            <>
                                <FiSave /> {isEditMode ? "Update Note" : "Save Note"}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NoteEditor;
