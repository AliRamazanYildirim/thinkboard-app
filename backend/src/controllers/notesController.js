export const getAllNotes = async (req, res) => {
    res.send('You have reached the notes API');
};

export const createNote = async (req, res) => {
  res.status(201).json({ message: 'Note created successfully.' });
}

export const updateNote = async (req, res) => {
  res.status(200).json({ message: 'Note updated successfully.' });
}

export const deleteNote = async (req, res) => {
  res.status(200).json({ message: 'Note deleted successfully.' });
}