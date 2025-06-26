import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {
    try {
      const notes = await Note.find()
        .sort({ createdAt: -1 }) // -1 will sort by createdAt in descending order (newest first)
        res.status(200).json(notes);
        console.log('Fetched all notes successfully.');
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: 'Note not found.' });
    res.status(200).json(note);
    console.log(`Fetched note with ID ${id} successfully.`);
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, tags, color, isPinned = false, isArchived = false, priority = 'low' } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    // Validate title length
    if (title.length > 200) {
      return res.status(400).json({ message: 'Title must be less than 200 characters.' });
    }

    // Validate content length
    if (content.length > 10000) {
      return res.status(400).json({ message: 'Content must be less than 10000 characters.' });
    }

    // Validate color format
    if (color) {
      const colorRegex = /^#[0-9A-F]{6}$/i;
      if (!colorRegex.test(color)) {
        return res.status(400).json({ message: 'Invalid color format. Use hex code like #FFFFFF.' });
      }
    }

    // Validate tags format
    if (tags && (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))) {
      return res.status(400).json({ message: 'Tags must be an array of strings.' });
    }

    // Validate priority
    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Priority must be one of: low, medium, high.' });
    }

    const newNote = new Note({
      title,
      content,
      tags,
      color,
      isPinned,
      isArchived,
      priority
    });

    const savedNote = await newNote.save();
    res.status(201).json({ message: 'Note created successfully.', note: savedNote });
    // Logging can be handled by a logger middleware in production
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, color, isPinned, isArchived, priority } = req.body;

  try {
    // Validations
    if (title && title.length > 200) {
      return res.status(400).json({ message: 'Title must be less than 200 characters.' });
    }

    if (content && content.length > 10000) {
      return res.status(400).json({ message: 'Content must be less than 10000 characters.' });
    }

    if (color) {
      const colorRegex = /^#[0-9A-F]{6}$/i;
      if (!colorRegex.test(color)) {
        return res.status(400).json({ message: 'Invalid color format. Use hex code like #FFFFFF.' });
      }
    }

    if (priority) {
      const validPriorities = ['low', 'medium', 'high'];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Priority must be one of: low, medium, high.' });
      }
    }

    // Build update object with only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (tags !== undefined) updateData.tags = tags;
    if (color !== undefined) updateData.color = color;
    if (isPinned !== undefined) updateData.isPinned = isPinned;
    if (isArchived !== undefined) updateData.isArchived = isArchived;
    if (priority !== undefined) updateData.priority = priority;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validations
      }
    );

    if (!updatedNote) return res.status(404).json({ message: 'Note not found.' });

    res.status(200).json({ message: 'Note updated successfully.', note: updatedNote });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByIdAndDelete(id); // Find and delete the note by ID
    if (!note)  return res.status(404).json({ message: 'Note not found.' });
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}