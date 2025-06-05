import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus, Edit3, Trash2, Save, X, Search, FileText } from 'lucide-react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch notes and sync deletes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`);
        setNotes(response.data);
        setIsLoading(false);
        setError('');
      } catch (error) {
        console.error('Error fetching notes:', error);
        setError('Failed to fetch notes. Please try again.');
        setIsLoading(false);
        toast.error('Failed to fetch notes.');
      }
    };

    const syncDeletes = async () => {
      const pendingDeletes = JSON.parse(localStorage.getItem('pendingDeletes') || '[]');
      if (pendingDeletes.length > 0 && navigator.onLine) {
        for (const id of pendingDeletes) {
          try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);
            toast.success(`Synced delete for note ID: ${id}`);
          } catch (error) {
            console.error('Error syncing delete:', error);
            toast.error(`Failed to sync delete for note ID: ${id}`);
          }
        }
        localStorage.setItem('pendingDeletes', '[]');
      }
    };

    fetchNotes();
    syncDeletes();
  }, []);

  // Filter notes based on search
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/notes/${editId}`, { title, content });
        setNotes(notes.map((note) => (note._id === editId ? response.data : note)));
        setEditId(null);
        toast.success('Note updated successfully!');
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`, { title, content });
        setNotes([response.data, ...notes]);
        toast.success('Note created successfully!');
      }
      setTitle('');
      setContent('');
      setShowForm(false);
      setError('');
    } catch (error) {
      console.error('Error saving note:', error);
      setError('Failed to save note. Please try again.');
      toast.error('Failed to save note.');
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      if (!navigator.onLine) {
        const pendingDeletes = JSON.parse(localStorage.getItem('pendingDeletes') || '[]');
        pendingDeletes.push(id);
        localStorage.setItem('pendingDeletes', JSON.stringify(pendingDeletes));
        setNotes(notes.filter((note) => note._id !== id));
        toast.info('You are offline. Delete request queued.');
        return;
      }
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note. Please try again.');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setEditId(null);
    setShowForm(false);
  };

  const handleNewNote = () => {
    setTitle('');
    setContent('');
    setEditId(null);
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your notes...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="main-container">
        {/* Header */}
        <div className="header">
          <div className="header-icon">
            <FileText className="icon-file" />
            <h1 className="header-title">Personal Notes</h1>
          </div>
          <p className="header-subtitle">Capture your thoughts and ideas</p>
        </div>

        {/* Search and Add Button */}
        <div className="search-add-container">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={handleNewNote} className="add-button">
            <Plus className="icon-plus" />
            New Note
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">{editId ? 'Edit Note' : 'Create New Note'}</h2>
                <button onClick={handleCancel} className="modal-close">
                  <X className="icon-close" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    placeholder="Enter note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Content</label>
                  <textarea
                    placeholder="Write your note content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={8}
                    className="form-textarea"
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="save-button">
                    <Save className="icon-save" />
                    {editId ? 'Update Note' : 'Save Note'}
                  </button>
                  <button type="button" onClick={handleCancel} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="notes-grid">
          {filteredNotes.length === 0 ? (
            <div className="no-notes">
              <FileText className="icon-no-notes" />
              <h3 className="no-notes-title">{searchTerm ? 'No notes found' : 'No notes yet'}</h3>
              <p className="no-notes-subtitle">
                {searchTerm ? 'Try a different search term' : 'Create your first note to get started'}
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div key={note._id} className="note-card">
                <div className="note-header">
                  <h3 className="note-title">{note.title}</h3>
                  <div className="note-actions">
                    <button onClick={() => handleEdit(note)} className="edit-button" title="Edit note">
                      <Edit3 className="icon-edit" />
                    </button>
                    <button onClick={() => handleDelete(note._id)} className="delete-button" title="Delete note">
                      <Trash2 className="icon-trash" />
                    </button>
                  </div>
                </div>
                <p className="note-content">{note.content}</p>
                <div className="note-footer">
                  <span className="note-footer-text">Click to edit or delete</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;