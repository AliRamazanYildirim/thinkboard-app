import toast from 'react-hot-toast';
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUi from '../components/RateLimitedUi';
import NoteCard from '../components/NoteCard';
import apiClient from '../lib/axios';

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
        
        // Einfache Logik: Wenn keine Notizen vorhanden sind, Rate-Limit anzeigen
        setIsRateLimited(response.data.length === 0 ? true : false);
        
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
      
      toast.success(response.data.isPinned ? 'Notiz angepinnt!' : 'Notiz entpinnt!');
    } catch (error) {
      console.error('Error toggling pin:', error);
      toast.error('Fehler beim Pinnen der Notiz!');
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
      
      toast.success(response.data.isArchived ? 'Notiz archiviert!' : 'Notiz aus Archiv geholt!');
    } catch (error) {
      console.error('Error toggling archive:', error);
      toast.error('Fehler beim Archivieren der Notiz!');
    }
  };

  // Delete Handler
  const handleDelete = async (noteId) => {
    if (!window.confirm('Sind Sie sicher, dass Sie diese Notiz löschen möchten?')) {
      return;
    }

    try {
      await apiClient.delete(`/notes/${noteId}`);
      
      // Notes State aktualisieren
      setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
      
      toast.success('Notiz erfolgreich gelöscht!');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Fehler beim Löschen der Notiz!');
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
        {notes.length === 0 && !loading && !isRateLimited && (
          <div className="text-gray-100 text-center">
            No notes available.
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage