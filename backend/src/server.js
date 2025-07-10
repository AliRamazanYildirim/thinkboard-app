// Pakete
import express from "express";
import cors from "cors";
import path from "path";

// Importiere die Routen und die Datenbankverbindung
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const __dirname = path.resolve();

// Statische Dateipfad-Variable
const distPath = path.join(__dirname, "../frontend/dist");

// Da es sich um eine asynchrone Funktion handelt, verwende await
const startServer = async () => {
  try {
    await connectDB();

    // Middlewares
    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:5173",
    ];

    app.use(
      cors({
        origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(null, false);// CORS ablehnen statt Fehler werfen
          }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        optionsSuccessStatus: 200 // Für alte Browser, die 204 nicht unterstützen
      })
    );

    app.use(express.json()); // Diese Middleware wird JSON-Körper analysieren: req.body
    app.use(rateLimiter); // Füge den Ratelimiter Middleware hinzu

    app.use("/api/notes", notesRoutes);

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(distPath));
      app.use((_, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Beendet den Prozess, wenn die Verbindung zur Datenbank fehlschlägt
  }
};

startServer();
