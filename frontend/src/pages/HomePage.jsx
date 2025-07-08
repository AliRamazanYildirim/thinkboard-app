import toast from 'react-hot-toast';
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUi from '../components/RateLimitedUi';
import NoteCard from '../components/NoteCard';
import apiClient from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/notes");
        console.log('Fetched notes:', response.data);
        
        setNotes(response.data);
        
        // Rate Limit Check
        setIsRateLimited(false);
        
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error("Failed to load notes!");
        setIsRateLimited(true); // Auch im Fehlerfall anzeigen
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Pin/Unpin Handler
  const handlePin = async (noteId) => {
    try {
      const response = await apiClient.patch(`/notes/${noteId}/pin`);
      
      // Notes State aktualisieren
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note._id === noteId 
            ? { ...note, isPinned: response.data.isPinned }
            : note
        )
      );
      
      toast.success(response.data.isPinned ? 'Note pinned!' : 'Note unpinned!');
    } catch (error) {
      console.error('Error toggling pin:', error);
      toast.error('Error pinning the note!');
    }
  };

  // Archive/Unarchive Handler
  const handleArchive = async (noteId) => {
    try {
      const response = await apiClient.patch(`/notes/${noteId}/archive`);
      
      // Notes State aktualisieren
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note._id === noteId 
            ? { ...note, isArchived: response.data.isArchived }
            : note
        )
      );
      
      toast.success(response.data.isArchived ? 'Note archived!' : 'Note retrieved from archive!');
    } catch (error) {
      console.error('Error toggling archive:', error);
      toast.error('Error while archiving the note!');
    }
  };

  // Delete Handler
  const handleDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await apiClient.delete(`/notes/${noteId}`);
      
      // Notes State aktualisieren
      setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
      
      toast.success('Note successfully deleted!');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Error deleting the note!');
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUi />}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-gray-300 text-center">Loading notes...</div>
        )}      

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onPin={handlePin}
                onArchive={handleArchive}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

      </div>
    </div>
  );
}

export default HomePage