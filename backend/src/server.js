// Pakete
import express from 'express';
import cors from 'cors';

// Importiere die Routen und die Datenbankverbindung
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js'; 
import rateLimiter from './middleware/rateLimiter.js';

const app = express();

// Da es sich um eine asynchrone Funktion handelt, verwende await
const startServer = async () => {
  try {
    await connectDB();
    
    //middlewares
    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:5173",
    ];

    app.use(
      cors({
        origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Nicht erlaubte Origin"));
          }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
        allowedHeaders: ["Content-Type", "Authorization"], 
        credentials: true,
        optionsSuccessStatus: 200 // Für alte Browser, die 204 nicht unterstützen
      })
    );
    
    app.use(express.json());
    app.use(rateLimiter); // Füge den Ratelimiter Middleware hinzu

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