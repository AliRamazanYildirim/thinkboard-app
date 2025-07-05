import axios from 'axios';
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUi from '../components/RateLimitedUi';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5001/api/notes"); // API-Endpunkt-Beispiel
        console.log('Fetched notes:', response.data);
        setIsRateLimited(response.data.length === 0 ? true : false);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <NavBar />
      {isRateLimited && <RateLimitedUi /> }
    </div>
  )
}

export default HomePage