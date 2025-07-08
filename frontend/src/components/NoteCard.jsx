import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon, Pin, PinOff, Archive, ArchiveRestore } from 'lucide-react'

const NoteCard = ({note, onDelete, onPin, onArchive}) => {
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

  // Button Handler
  const handleDelete = (e) => {
    e.preventDefault(); // Verhindere das Funktionieren des Links
    e.stopPropagation();
    onDelete && onDelete(note._id);
  };

  const handlePin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onPin && onPin(note._id);
  };

  const handleArchive = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onArchive && onArchive(note._id);
  };

  return (
    <div
      className="relative card bg-gradient-to-br from-green-900 to-black backdrop-blur-sm  border-slate-700 rounded-2xl shadow-xl p-6  hover:shadow-xl transition-all duration-100
    border-t-4 border-solid border-orange border-2
    hover:border-orange hover:border-opacity-80 hover:scale-105"
      style={{ borderTopColor: note.color || "#fb923c" }}
    >
      {/* Pin und Archive Buttons - Links oben */}
      <div className="absolute top-[-1px] left-2 flex gap-1">
        <button
          onClick={handlePin}
          className={`btn btn-xs btn-square btn-ghost ${
            note.isPinned
              ? "text-white hover:btn-warning"
              : "hover:bg-warning hover:text-black"
          }`}
          title={note.isPinned ? "Unpin" : "Pin on"}
        >
          {note.isPinned ? <Pin size={16} /> : <PinOff size={16} />}
        </button>
        <button
          onClick={handleArchive}
          className={`btn btn-xs btn-square btn-ghost ${
            note.isArchived
              ? "text-info hover:btn-info hover:text-black"
              : "hover:btn-info hover:text-white"
          }`}
          title={note.isArchived ? "Retrieve from archive" : "Archive"}
        >
          {note.isArchived ? (
            <ArchiveRestore size={16} />
          ) : (
            <Archive size={16} />
          )}
        </button>
      </div>

      {/* Bearbeitungs- und Löschbuttons - Rechts oben */}
      <div className="absolute top-[-1px] right-2 flex gap-1">
        <Link
          to={`/note/${note._id}`}
          className="btn btn-xs btn-square btn-ghost hover:btn-info"
          title="Edit"
        >
          <PenSquareIcon size={16} />
        </Link>
        <button
          onClick={handleDelete}
          className="btn btn-xs btn-square btn-ghost hover:btn-error"
          title="Delete"
        >
          <Trash2Icon size={16} />
        </button>
      </div>

      <Link to={`/note/${note._id}`} className="block">
        <div className="card-body">
          {/* Kopfzeile mit Titel */}
          <div className="flex justify-between items-start">
            <h2 className="card-title text-base-content">{note.title}</h2>
          </div>

          {/* Inhalt */}
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>

          {/* Schlagwörter */}
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {note.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-500/50 text-white rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="badge badge-ghost badge-sm">
                  +{note.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Fußzeile */}
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(note.createdAt)}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`badge badge-sm text-black ${getPriorityBadge(note.priority)}`}
              >
                {note.priority}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default NoteCard