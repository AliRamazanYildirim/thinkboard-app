import { Routes, Route } from 'react-router-dom'
import { HomePage, CreatePage, NoteDetailPage } from './pages'

const App = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App