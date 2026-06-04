import { FiTrash2, FiEdit3, FiArchive } from 'react-icons/fi';

export default function Note({ note, onDelete, onArchive, onEdit }) {
    const { _id, title, content, isArchived, updatedAt, createdAt } = note;

    const handleDelete = () => {
        if (!_id) return;
        if (confirm('Are you sure you want to permanently delete this note?')) {
            onDelete(_id);
        }
    };

    const handleArchive = () => {
        if (!_id) return;
        onArchive(_id, isArchived);
    };

    const handleEdit = () => {
        onEdit(note);
    };

    // Format ISO date string into a beautiful readable format
    const formatDate = (dateString) => {
        if (!dateString) return 'Just now';
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    // Pick a deterministic gradient accent based on the note title
    const getAccentGradient = (str = '') => {
        const gradients = [
            'from-pink-500 to-rose-500',      // Rose/Pink
            'from-purple-500 to-indigo-500',  // Violet/Indigo
            'from-blue-500 to-cyan-500',      // Cool Blue
            'from-emerald-500 to-teal-500',   // Mint/Teal
            'from-amber-500 to-orange-500',   // Sunset/Amber
        ];
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % gradients.length;
        return gradients[index];
    };

    const accentGradient = getAccentGradient(title);

    return (
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-52 group relative overflow-hidden">
            {/* Background glowing glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500/0 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>

            <div className="relative">
                {/* Accent top line indicator */}
                <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${accentGradient} mb-4`}></div>
                
                {/* Title */}
                <h3 className="text-base font-bold font-display text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1 mb-2">
                    {title}
                </h3>
                
                {/* Body Content */}
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                    {content || <span className="italic text-slate-500">No content provided.</span>}
                </p>
            </div>

            {/* Card Footer Actions */}
            <div className="relative flex justify-between items-center pt-4 border-t border-slate-800/80 mt-4">
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {formatDate(updatedAt || createdAt)}
                </span>
                
                <div className="flex items-center space-x-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    {/* Edit button */}
                    <button 
                        onClick={handleEdit}
                        title="Edit note"
                        className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800/50 rounded-lg transition"
                    >
                        <FiEdit3 className="w-4 h-4" />
                    </button>

                    {/* Archive button */}
                    <button 
                        onClick={handleArchive}
                        title={isArchived ? "Restore to workspace" : "Archive note"}
                        className={`p-1.5 rounded-lg transition ${
                            isArchived 
                                ? 'text-amber-500 hover:text-amber-400 hover:bg-amber-500/10' 
                                : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-800/50'
                        }`}
                    >
                        <FiArchive className="w-4 h-4" />
                    </button>

                    {/* Delete button */}
                    <button 
                        onClick={handleDelete}
                        title="Delete note"
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
