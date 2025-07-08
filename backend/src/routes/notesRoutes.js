import express from 'express';
import {updateNote, createNote, getAllNotes, deleteNote, getNoteById, togglePin, toggleArchive } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getAllNotes) // Assuming you have a getAllNotes function
router.get('/:id', getNoteById); // Assuming you have a getNoteById function
router.post('/', createNote); // Assuming you have a createNote function
router.put('/:id', updateNote); // Assuming you have an updateNote function
router.delete('/:id', deleteNote); // Assuming you have a deleteNote function

// Importieren der Funktionen zum Anpinnen und Archivieren
router.patch('/:id/pin', togglePin);
router.patch('/:id/archive', toggleArchive);

export default router;