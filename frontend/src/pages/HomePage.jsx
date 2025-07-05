import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUi from '../components/RateLimitedUi';
import NoteCard from '../components/NoteCard';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5001/api/notes");
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
                className="bg-orange-500 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                <p className="text-gray-700">{note.content}</p>
              </NoteCard>
            ))}
            {notes.length === 0 && !loading && !isRateLimited && (
              <div className="text-gray-100 text-center">
                No notes available.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage