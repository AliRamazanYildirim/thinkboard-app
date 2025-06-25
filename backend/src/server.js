import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js'; 
import dotenv from 'dotenv';

dotenv.config(); // Lädt Umgebungsvariablen aus .env-Datei

const app = express();

// Da es sich um eine asynchrone Funktion handelt, verwende await
const startServer = async () => {
  try {
    await connectDB();
    
    app.use(express.json());
    app.use('/api/notes', notesRoutes);
    
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Beendet den Prozess, wenn die Verbindung zur Datenbank fehlschlägt
  }
};

startServer();