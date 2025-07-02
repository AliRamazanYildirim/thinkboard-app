import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage, CreatePage, NoteDetailPage } from './pages'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <button onClick={() => toast.success('baNaNa')}>Click me</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="notes/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App