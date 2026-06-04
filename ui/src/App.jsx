import { useEffect, useState } from 'react';
import NoteService from "./services/noteService";
import NoteList from "./components/noteList";
import Sidebar from "./components/sidebar";
import NoteModal from "./components/noteModal";
import { Toaster, toast } from 'react-hot-toast';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Tabs and Search state
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'archived' | 'all'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Note Form state
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const [activeData, archivedData] = await Promise.all([
        NoteService.getNotes(false),
        NoteService.getNotes(true)
      ]);
      
      const activeWithStatus = activeData.map(n => ({ ...n, isArchived: false }));
      const archivedWithStatus = archivedData.map(n => ({ ...n, isArchived: true }));
      
      setNotes([...activeWithStatus, ...archivedWithStatus]);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch notes.');
      toast.error('Could not connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim()) {
      toast.error('Title is required!');
      return;
    }
    
    try {
      const created = await NoteService.createNote(newNote);
      setNotes((prev) => [created, ...prev]);
      setNewNote({ title: '', content: '' });
      setIsCreateOpen(false);
      toast.success('Note created successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to create note');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editingNote || !editingNote.title.trim()) {
      toast.error('Title is required!');
      return;
    }

    try {
      const updated = await NoteService.updateNote(editingNote._id, {
        title: editingNote.title,
        content: editingNote.content,
        isArchived: editingNote.isArchived
      });
      
      setNotes((prev) => prev.map((n) => (n._id === updated._id ? { ...updated, isArchived: n.isArchived } : n)));
      setIsEditOpen(false);
      setEditingNote(null);
      toast.success('Note updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    try {
      await NoteService.deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success('Note deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to delete note');
    }
  };

  const handleToggleArchive = async (id, currentArchiveState) => {
    try {
      const targetNote = notes.find(n => n._id === id);
      await NoteService.updateNote(id, {
        title: targetNote.title,
        content: targetNote.content,
        isArchived: !currentArchiveState
      });
      
      setNotes((prev) => 
        prev.map((n) => (n._id === id ? { ...n, isArchived: !currentArchiveState } : n))
      );
      
      toast.success(!currentArchiveState ? 'Note archived!' : 'Note unarchived!');
    } catch (err) {
      toast.error(err.message || 'Action failed');
    }
  };

  const openEditModal = (note) => {
    setEditingNote({ ...note });
    setIsEditOpen(true);
  };

  // Filter notes based on active tab and search query
  const filteredNotes = notes.filter((note) => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'active' && !note.isArchived) || 
      (activeTab === 'archived' && note.isArchived);
      
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesTab && matchesSearch;
  });

  // Calculate statistics
  const totalNotesCount = notes.length;
  const activeNotesCount = notes.filter(n => !n.isArchived).length;
  const archivedNotesCount = notes.filter(n => n.isArchived).length;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'glass-panel text-slate-100 border border-slate-700/50',
          style: {
            background: 'rgba(23, 29, 50, 0.9)',
            color: '#f8fafc',
            backdropFilter: 'blur(8px)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }} 
      />

      {/* Sidebar Navigation */}
      <Sidebar 
        totalNotesCount={totalNotesCount}
        activeNotesCount={activeNotesCount}
        archivedNotesCount={archivedNotesCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-y-auto px-4 md:px-8 py-6">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-100 capitalize">
              {activeTab === 'all' ? 'All Workspace' : activeTab === 'active' ? 'Active Notes' : 'Archived Notes'}
            </h2>
            <p className="text-sm text-slate-400">
              {filteredNotes.length === 0 
                ? 'No items found' 
                : `Showing ${filteredNotes.length} of ${notes.length} notes`}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FiSearch className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 rounded-xl glass-input text-sm text-slate-200"
            />
          </div>
        </header>

        {/* Error State */}
        {error && (
          <div className="p-4 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start space-x-3 text-rose-200">
            <FiAlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm">Connection Error</h3>
              <p className="text-xs text-rose-300/90 mt-1">{error}</p>
              <button 
                onClick={fetchNotes} 
                className="mt-3 text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-semibold px-3 py-1.5 rounded-lg border border-rose-500/20 transition"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* Note Grid */}
        <NoteList 
          notes={filteredNotes} 
          onDelete={handleDelete} 
          onArchive={handleToggleArchive} 
          onEdit={openEditModal} 
          loading={loading}
          searchQuery={searchQuery}
        />
      </main>

      {/* CREATE NOTE MODAL */}
      <NoteModal 
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
        modalTitle="Create New Note"
        titleValue={newNote.title}
        onTitleChange={(val) => setNewNote(prev => ({ ...prev, title: val }))}
        contentValue={newNote.content}
        onContentChange={(val) => setNewNote(prev => ({ ...prev, content: val }))}
        submitText="Save Note"
      />

      {/* EDIT NOTE MODAL */}
      <NoteModal 
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingNote(null);
        }}
        onSubmit={handleEdit}
        modalTitle="Edit Note"
        titleValue={editingNote ? editingNote.title : ''}
        onTitleChange={(val) => setEditingNote(prev => ({ ...prev, title: val }))}
        contentValue={editingNote ? (editingNote.content || '') : ''}
        onContentChange={(val) => setEditingNote(prev => ({ ...prev, content: val }))}
        submitText="Save Changes"
      />
    </div>
  );
}

export default App;
