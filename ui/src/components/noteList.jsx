import Note from './note';
import { FiEdit3, FiBookOpen, FiInbox, FiSearch } from 'react-icons/fi';

export default function NoteList({ notes, onDelete, onArchive, onEdit, loading, searchQuery }) {
    // Render Loading Skeletons
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                    <div 
                        key={idx} 
                        className="glass-card rounded-2xl p-6 h-48 flex flex-col justify-between animate-pulse-subtle pointer-events-none"
                    >
                        <div>
                            {/* Accent bar skeleton */}
                            <div className="h-1.5 w-16 bg-slate-700/60 rounded-full mb-4"></div>
                            {/* Title skeleton */}
                            <div className="h-5 w-3/4 bg-slate-700/60 rounded-lg mb-3"></div>
                            {/* Content skeleton */}
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-slate-800/60 rounded"></div>
                                <div className="h-3 w-5/6 bg-slate-800/60 rounded"></div>
                            </div>
                        </div>
                        {/* Footer skeleton */}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-800/60">
                            <div className="h-3 w-20 bg-slate-850 rounded"></div>
                            <div className="flex space-x-2">
                                <div className="h-8 w-8 bg-slate-800/60 rounded-lg"></div>
                                <div className="h-8 w-8 bg-slate-800/60 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Render Empty State
    if (notes.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[350px] glass-panel rounded-2xl border border-slate-800/60 mt-2">
                <div className="w-16 h-16 rounded-2xl bg-indigo-950/40 border border-indigo-800/20 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
                    {searchQuery ? (
                        <FiSearch className="w-8 h-8 animate-bounce" />
                    ) : (
                        <FiInbox className="w-8 h-8" />
                    )}
                </div>
                <h3 className="text-lg font-bold font-display text-slate-100 mb-1.5">
                    {searchQuery ? 'No matching notes found' : 'Your workspace is empty'}
                </h3>
                <p className="text-sm text-slate-400 max-w-sm">
                    {searchQuery 
                        ? `We couldn't find any notes matching "${searchQuery}". Try editing your keywords.` 
                        : 'Capture your thoughts, ideas, tasks, and notes by clicking "Create Note" in the sidebar.'}
                </p>
            </div>
        );
    }

    // Render Note Cards
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {notes.map((note, index) => (
                <Note 
                    key={note._id || index} 
                    note={note}
                    onDelete={onDelete} 
                    onArchive={onArchive}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}