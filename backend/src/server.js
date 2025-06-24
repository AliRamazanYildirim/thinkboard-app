import express from 'express';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use('/api/notes', notesRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
