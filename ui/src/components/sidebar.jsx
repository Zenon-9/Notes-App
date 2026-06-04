import { 
  FiPlus, 
  FiArchive, 
  FiBookOpen, 
  FiFolder 
} from 'react-icons/fi';

export default function Sidebar({ 
  totalNotesCount, 
  activeNotesCount, 
  archivedNotesCount, 
  activeTab, 
  setActiveTab, 
  onCreateClick 
}) {
  return (
    <aside className="w-full md:w-64 lg:w-72 glass-panel border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0">
      <div>
        {/* Logo / Branding */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-xl font-display">N</span>
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-wide text-slate-100 bg-clip-text">
              MindSpace
            </h1>
            <p className="text-xs text-slate-400 font-medium">Your Second Brain</p>
          </div>
        </div>

        {/* Quick Stats Panel */}
        <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-900/50 p-3 rounded-xl border border-slate-800/40">
          <div className="text-center">
            <span className="block text-lg font-bold text-indigo-400 font-display">{totalNotesCount}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Total</span>
          </div>
          <div className="text-center border-x border-slate-800/60">
            <span className="block text-lg font-bold text-emerald-400 font-display">{activeNotesCount}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Active</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold text-amber-400 font-display">{archivedNotesCount}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Archived</span>
          </div>
        </div>

        {/* Create Button */}
        <button 
          onClick={onCreateClick}
          className="w-full py-3 px-4 mb-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all transform hover:-translate-y-[2px]"
        >
          <FiPlus className="w-5 h-5" />
          <span>Create Note</span>
        </button>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          <button 
            onClick={() => setActiveTab('active')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'active' 
                ? 'bg-indigo-600/15 text-indigo-400 border-l-4 border-indigo-500 font-semibold' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FiFolder className="w-4 h-4" />
              <span className="text-sm">Active Notes</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-normal">{activeNotesCount}</span>
          </button>

          <button 
            onClick={() => setActiveTab('archived')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'archived' 
                ? 'bg-indigo-600/15 text-indigo-400 border-l-4 border-indigo-500 font-semibold' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FiArchive className="w-4 h-4" />
              <span className="text-sm">Archive</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-normal">{archivedNotesCount}</span>
          </button>

          <button 
            onClick={() => setActiveTab('all')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'all' 
                ? 'bg-indigo-600/15 text-indigo-400 border-l-4 border-indigo-500 font-semibold' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FiBookOpen className="w-4 h-4" />
              <span className="text-sm">All Notes</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-normal">{totalNotesCount}</span>
          </button>
        </nav>
      </div>

      {/* Footer info */}
      <div className="hidden md:block pt-6 border-t border-slate-800/60 text-center">
        <p className="text-xs text-slate-500">MindSpace App v1.2</p>
        <p className="text-[10px] text-slate-600 mt-1">Made with premium components</p>
      </div>
    </aside>
  );
}
