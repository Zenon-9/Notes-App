import { FiX } from 'react-icons/fi';

export default function NoteModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  modalTitle, 
  titleValue, 
  onTitleChange, 
  contentValue, 
  onContentChange, 
  submitText = 'Save' 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-slate-700/60 shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
          <h3 className="text-lg font-bold font-display text-slate-100">{modalTitle}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Note Title
            </label>
            <input 
              type="text" 
              placeholder="Enter a descriptive title..."
              value={titleValue}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-100"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Note Body
            </label>
            <textarea 
              placeholder="Start typing your thoughts..."
              rows="6"
              value={contentValue}
              onChange={(e) => onContentChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-100 resize-none font-sans leading-relaxed"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800/80 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 font-semibold text-sm hover:bg-slate-800/60 transition cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/10 transition cursor-pointer"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
