import express from 'express';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get('/api/notes', (req, res) => {
  res.send('This is the notes API endpoint.');
});

app.post('/api/notes', (req, res) => {
  res.status(201).json({message:'Note created successfully.'});
});

app.put('/api/notes/:id', (req, res) => {
  res.status(200).json({message:'Note updated successfully.'});
});

app.delete('/api/notes/id', (req, res) => {
  res.status(200).json({message:'Note deleted successfully.'});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
