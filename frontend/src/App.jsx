import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage, CreatePage, NoteDetailPage } from './pages'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="notes/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App