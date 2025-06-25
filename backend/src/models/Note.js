import { model, Schema } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Titel darf maximal 200 Zeichen lang sein']
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: [10000, 'Inhalt darf maximal 10000 Zeichen lang sein']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  color: {
    type: String,
    default: '#ffffff',
    match: [/^#[0-9A-F]{6}$/i, 'Ungültiger Farbcode']
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
// Verwalte automatisch createdAt and updatedAt Felder
  timestamps: true, 
  versionKey: false,
});

// Indizes für bessere Performance
noteSchema.index({ createdAt: -1 }); // Neueste Notizen zuerst
noteSchema.index({ tags: 1 }); // Indiziert Tags für schnellere Suche
noteSchema.index({ isPinned: -1, createdAt: -1 }); // Pinned Notizen zuerst, dann nach Erstellungsdatum

const Note = model("Note", noteSchema);

export default Note;
