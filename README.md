# ThinkBoard - Smart Notes App

## 🇩🇪 Deutsch | 🇺🇸 English

---

## 🇩🇪 Deutsch

### Übersicht

ThinkBoard ist eine moderne, responsive Notiz-App, die es Benutzern ermöglicht, ihre Gedanken und Ideen effizient zu organisieren. Die App bietet eine intuitive Benutzeroberfläche mit erweiterten Funktionen wie Notiz-Kategorisierung, Priorisierung und Archivierung.

### ✨ Hauptfunktionen

- **📝 Notiz-Management**: Erstellen, bearbeiten und löschen von Notizen
- **🏷️ Tag-System**: Organisieren von Notizen mit anpassbaren Tags
- **📌 Pin-Funktion**: Wichtige Notizen anheften
- **📦 Archivierung**: Notizen archivieren und wiederherstellen
- **🎨 Farbkodierung**: Individuelle Farben für bessere Visualisierung
- **⚡ Prioritätsstufen**: Low, Medium, High Prioritäten
- **🔒 Rate Limiting**: Schutz vor zu vielen Anfragen
- **📱 Responsive Design**: Optimiert für alle Geräte

### 🛠️ Technologie-Stack

#### Frontend

- **React 19.1.0** - Moderne UI-Bibliothek
- **React Router 7.6.3** - Client-seitiges Routing
- **Tailwind CSS 3.4.17** - Utility-first CSS Framework
- **DaisyUI 5.0.43** - Tailwind CSS Komponenten-Bibliothek
- **Lucide React** - Moderne Icon-Bibliothek
- **React Hot Toast** - Benutzerfreundliche Benachrichtigungen
- **Axios** - HTTP-Client für API-Aufrufe
- **Vite** - Schnelles Build-Tool

#### Backend

- **Node.js mit Bun Runtime** - Moderne JavaScript-Laufzeit
- **Express 5.1.0** - Web-Framework
- **MongoDB mit Mongoose 8.16.0** - NoSQL-Datenbank
- **Upstash Redis** - Rate Limiting und Caching
- **CORS** - Cross-Origin Resource Sharing

### 🚀 Installation und Setup

#### Voraussetzungen

- Node.js (v18 oder höher)
- Bun Runtime
- MongoDB-Instanz
- Upstash Redis-Account

#### 1. Repository klonen

```bash
git clone <repository-url>
cd thinkboard-app
```

#### 2. Backend Setup

```bash
cd backend
bun install

# Umgebungsvariablen konfigurieren
cp .env.example .env
```

**Backend .env Konfiguration:**

```env
MONGO_URI=mongodb://localhost:27017/thinkboard
PORT=5001
FRONTEND_URL=http://localhost:5173
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

#### 3. Frontend Setup

```bash
cd frontend
bun install

# Umgebungsvariablen konfigurieren
cp .env.example .env
```

**Frontend .env Konfiguration:**

```env
VITE_API_URL=http://localhost:5001/api
```

#### 4. Anwendung starten

```bash
# Backend starten
cd backend
bun run dev

# Frontend starten (neues Terminal)
cd frontend
bun run dev
```

### 📁 Projektstruktur

```path
thinkboard-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js          # MongoDB-Konfiguration
│   │   │   └── upstash.js     # Redis Rate Limiting
│   │   ├── controllers/
│   │   │   └── notesController.js  # Notiz-Logik
│   │   ├── middleware/
│   │   │   └── rateLimiter.js      # Rate Limiting Middleware
│   │   ├── models/
│   │   │   └── Note.js        # Notiz-Datenmodell
│   │   ├── routes/
│   │   │   └── notesRoutes.js # API-Routen
│   │   └── server.js          # Server-Konfiguration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx     # Navigation
│   │   │   ├── NoteCard.jsx   # Notiz-Karte
│   │   │   ├── NotesNotFound.jsx  # Leerzustand
│   │   │   └── RateLimitedUi.jsx  # Rate Limit UI
│   │   ├── pages/
│   │   │   ├── HomePage.jsx    # Startseite
│   │   │   ├── CreatePage.jsx  # Notiz erstellen
│   │   │   └── NoteDetailPage.jsx  # Notiz bearbeiten
│   │   ├── lib/
│   │   │   └── axios.js       # HTTP-Client
│   │   └── App.jsx            # Haupt-App-Komponente
│   └── package.json
└── README.md
```

### 🔧 Verfügbare Skripte

#### Backend-Bereich

```bash
bun run dev    # Entwicklungsserver mit nodemon
bun run start  # Produktionsserver
```

#### Frontend-Bereich

```bash
bun run dev     # Entwicklungsserver
bun run build   # Production Build
bun run preview # Build-Vorschau
```

### 📊 API-Endpunkte

#### Notizen

- `GET /api/notes` - Alle Notizen abrufen
- `GET /api/notes/:id` - Einzelne Notiz abrufen
- `POST /api/notes` - Neue Notiz erstellen
- `PUT /api/notes/:id` - Notiz aktualisieren
- `DELETE /api/notes/:id` - Notiz löschen

#### Notiz-Aktionen

- `PATCH /api/notes/:id/pin` - Notiz an-/abheften
- `PATCH /api/notes/:id/archive` - Notiz archivieren/wiederherstellen

### 🎨 Design-System

- **Farbschema**: Dark Theme mit grünen Akzenten
- **Typografie**: System-Schriftarten mit Tailwind CSS
- **Komponenten**: DaisyUI für konsistente UI-Elemente
- **Icons**: Lucide React für moderne Icons

### 🔒 Sicherheit

- **Rate Limiting**: 5 Anfragen pro Minute mit Upstash Redis
- **Input-Validierung**: Vollständige Validierung auf Backend-Seite
- **CORS-Konfiguration**: Sichere Cross-Origin-Requests
- **Fehlerbehandlung**: Umfassende Fehlerbehandlung

### 📱 Responsive Design

- **Mobile-First**: Optimiert für Mobilgeräte
- **Breakpoints**: sm, md, lg, xl Breakpoints
- **Touch-Friendly**: Optimiert für Touch-Interfaces

---

## 🇺🇸 English

### Overview

ThinkBoard is a modern, responsive note-taking app that allows users to efficiently organize their thoughts and ideas. The app features an intuitive user interface with advanced features like note categorization, prioritization, and archiving.

### ✨ Key Features

- **📝 Note Management**: Create, edit, and delete notes
- **🏷️ Tag System**: Organize notes with customizable tags
- **📌 Pin Function**: Pin important notes
- **📦 Archiving**: Archive and restore notes
- **🎨 Color Coding**: Individual colors for better visualization
- **⚡ Priority Levels**: Low, Medium, High priorities
- **🔒 Rate Limiting**: Protection against too many requests
- **📱 Responsive Design**: Optimized for all devices

### 🛠️ Technology Stack

#### Frontend

- **React 19.1.0** - Modern UI library
- **React Router 7.6.3** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **DaisyUI 5.0.43** - Tailwind CSS component library
- **Lucide React** - Modern icon library
- **React Hot Toast** - User-friendly notifications
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool

#### Backend

- **Node.js with Bun Runtime** - Modern JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB with Mongoose 8.16.0** - NoSQL database
- **Upstash Redis** - Rate limiting and caching
- **CORS** - Cross-Origin Resource Sharing

### 🚀 Installation and Setup

#### Prerequisites

- Node.js (v18 or higher)
- Bun Runtime
- MongoDB instance
- Upstash Redis account

#### 1. Clone Repository

```bash
git clone <repository-url>
cd thinkboard-app
```

#### 2. Backend Setup

```bash
cd backend
bun install

# Configure environment variables
cp .env.example .env
```

**Backend .env Configuration:**

```env
MONGO_URI=mongodb://localhost:27017/thinkboard
PORT=5001
FRONTEND_URL=http://localhost:5173
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

#### 3. Frontend Setup

```bash
cd frontend
bun install

# Configure environment variables
cp .env.example .env
```

**Frontend .env Configuration:**

```env
VITE_API_URL=http://localhost:5001/api
```

#### 4. Start Application

```bash
# Start backend
cd backend
bun run dev

# Start frontend (new terminal)
cd frontend
bun run dev
```

### 📁 Project Structure

```path
thinkboard-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js          # MongoDB configuration
│   │   │   └── upstash.js     # Redis rate limiting
│   │   ├── controllers/
│   │   │   └── notesController.js  # Note logic
│   │   ├── middleware/
│   │   │   └── rateLimiter.js      # Rate limiting middleware
│   │   ├── models/
│   │   │   └── Note.js        # Note data model
│   │   ├── routes/
│   │   │   └── notesRoutes.js # API routes
│   │   └── server.js          # Server configuration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx     # Navigation
│   │   │   ├── NoteCard.jsx   # Note card
│   │   │   ├── NotesNotFound.jsx  # Empty state
│   │   │   └── RateLimitedUi.jsx  # Rate limit UI
│   │   ├── pages/
│   │   │   ├── HomePage.jsx    # Home page
│   │   │   ├── CreatePage.jsx  # Create note
│   │   │   └── NoteDetailPage.jsx  # Edit note
│   │   ├── lib/
│   │   │   └── axios.js       # HTTP client
│   │   └── App.jsx            # Main app component
│   └── package.json
└── README.md
```

### 🔧 Available Scripts

#### Backend

```bash
bun run dev    # Development server with nodemon
bun run start  # Production server
```

#### Frontend

```bash
bun run dev     # Development server
bun run build   # Production build
bun run preview # Build preview
```

### 📊 API Endpoints

#### Notes

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

#### Note Actions

- `PATCH /api/notes/:id/pin` - Pin/unpin note
- `PATCH /api/notes/:id/archive` - Archive/restore note

### 🎨 Design System

- **Color Scheme**: Dark theme with green accents
- **Typography**: System fonts with Tailwind CSS
- **Components**: DaisyUI for consistent UI elements
- **Icons**: Lucide React for modern icons

### 🔒 Security

- **Rate Limiting**: 5 requests per minute with Upstash Redis
- **Input Validation**: Complete validation on backend side
- **CORS Configuration**: Secure cross-origin requests
- **Error Handling**: Comprehensive error handling

### 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: sm, md, lg, xl breakpoints
- **Touch-Friendly**: Optimized for touch interfaces

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database
- Bun for the fast JavaScript runtime
  