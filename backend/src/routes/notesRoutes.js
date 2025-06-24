import express from 'express';
import {updateNote, createNote, getAllNotes, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getAllNotes)
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;