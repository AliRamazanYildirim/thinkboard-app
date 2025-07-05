import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NoteCard = ({note, onDelete}) => {
  const navigate = useNavigate();

  // Prioritätsfarben
  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'badge-error',
      medium: 'badge-warning', 
      low: 'badge-success'
    };
    return badges[priority] || 'badge-neutral';
  };

  // Datumsformat
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  // Button Click Handler
  const handleEdit = (e) => {
    e.preventDefault(); // Verhindere das Funktionieren des Links
    e.stopPropagation();
   // Zur NoteDetailPage weiterleiten
    navigate(`/note/${note._id}/edit`);
  };

  const handleDelete = (e) => {
    e.preventDefault(); // Link'in çalışmasını engelle
    e.stopPropagation();
    onDelete && onDelete(note._id);
  };

  return (
    <div className='relative card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-100
    border-t-4 border-solid border-orange border-2 border-base-300
    hover:border-orange hover:border-opacity-80 hover:scale-105'
    style={{ borderTopColor: note.color || '#fb923c' }}>
        
        {/* Bearbeitungs- und Löschbuttons - Immer sichtbar */}
        <div className='absolute top-2 right-2 flex gap-1'>
          <button
            onClick={handleEdit}
            className='btn btn-sm btn-square btn-ghost hover:btn-info'
            title='Bearbeiten'
          >
            <PenSquareIcon size={16} />
          </button>
          <button
            onClick={handleDelete}
            className='btn btn-sm btn-square btn-ghost hover:btn-error'
            title='Löschen'
          >
            <Trash2Icon size={16} />
          </button>
        </div>

        <Link to={`/note/${note._id}`} className='block'>
          <div className='card-body'>
              {/* Kopfzeile mit Titel und Status-Symbolen */}
              <div className='flex justify-between items-start'>
                  <h2 className='card-title text-base-content'>{note.title}</h2>
                  <div className='flex gap-1'>
                    {note.isPinned && <span className='text-warning' style={{ position: 'relative', top: '-25px', left:'25px' }}>📌</span>}
                      {note.isArchived && <span className='text-base-content/50'>📦</span>}
                  </div>
              </div>
              
              {/* Inhalt */}
              <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
              
              {/* Schlagwörter */}
              {note.tags && note.tags.length > 0 && (
                  <div className='flex flex-wrap gap-1 mt-2'>
                      {note.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className='badge badge-outline badge-sm'>
                              #{tag}
                          </span>
                      ))}
                      {note.tags.length > 3 && (
                          <span className='badge badge-ghost badge-sm'>
                              +{note.tags.length - 3}
                          </span>
                      )}
                  </div>
              )}
              
              {/* Fußzeile */}
              <div className='card-actions justify-between items-center mt-4'>
                  <span className='text-sm text-base-content/60'>
                      {formatDate(note.createdAt)}
                  </span>
                  <div className='flex items-center gap-2'>
                      <span className={`badge badge-sm ${getPriorityBadge(note.priority)}`}>
                          {note.priority}
                      </span>
                  </div>
              </div>
          </div>
        </Link>
    </div>
  )
}

export default NoteCard