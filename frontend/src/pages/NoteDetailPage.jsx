import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import apiClient from "../lib/axios";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon, XIcon, PenSquareIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Zustände für die Bearbeitung
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("medium");
  const [color, setColor] = useState("#fb923c");

  const navigate = useNavigate();
  const { id } = useParams();

  const colorPalette = [
    { name: "Hellgelb", value: "#fff9c4" },
    { name: "Blau", value: "#bbdefb" },
    { name: "Grün", value: "#c8e6c9" },
    { name: "Gelb", value: "#fff59d" },
    { name: "Rosa", value: "#f8bbd9" },
    { name: "Orange", value: "#fb923c" },
  ];

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await apiClient.get(`/notes/${id}`);
        setNote(response.data);

        // Formularfelder ausfüllen
        setTitle(response.data.title || "");
        setContent(response.data.content || "");
        setTags(response.data.tags ? response.data.tags.join(", ") : "");
        setPriority(response.data.priority || "medium");
        setColor(response.data.color || "#fb923c");
      } catch (error) {
        toast.error("Failed to fetch note");
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Titel und Inhalt dürfen nicht leer sein!");
      return;
    }

    setSaving(true);
    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      await apiClient.put(`/notes/${id}`, {
        title: title.trim(),
        content: content.trim(),
        tags: tagsArray,
        priority,
        color,
      });

      // Formzustände sind bereits aktuell, schließe einfach den Bearbeitungsmodus
      setIsEditing(false);
      toast.success("Notiz erfolgreich aktualisiert!");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Fehler beim Aktualisieren der Notiz!");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!note) return;
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setSaving(true);
    try {
      await apiClient.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 btn btn-ghost"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-sm btn-square btn-ghost hover:btn-success"
                  title="Bearbeiten"
                >
                  <PenSquareIcon size={16} />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-sm btn-square btn-ghost hover:btn-warning"
                  title="Abbrechen"
                >
                  <XIcon size={16} />
                </button>
              )}
              <button
                onClick={handleDelete}
                className="btn btn-sm btn-square btn-ghost hover:btn-error"
                disabled={saving}
                title="Löschen"
              >
                <Trash2Icon size={16} />
              </button>
            </div>
          </div>

          {/* Note Card */}
          <div className="bg-gradient-to-br from-green-900 to-black backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl p-6">
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-green-900  border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 bg-green-900 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Tags (Komma-getrennt)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-3 bg-green-900  border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="z.B. #arbeit, #wichtig, #projekt"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-4 py-3 bg-green-900  border border-gray-600 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Notiz Farbe
                    </label>
                    <div className="grid grid-cols-6 gap-2 p-2 bg-green-900  rounded-full">
                      {colorPalette.map((colorOption) => (
                        <button
                          key={colorOption.value}
                          type="button"
                          onClick={() => setColor(colorOption.value)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                            color === colorOption.value
                              ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-800"
                              : "border-gray-400 hover:border-gray-300"
                          }`}
                          style={{ backgroundColor: colorOption.value }}
                          title={colorOption.name}
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        Spezielle Farbe:
                      </span>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="bg-green-900  w-8 h-8 rounded-lg border border-gray-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors duration-200 ${
                      saving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {/* note yerine form state'lerini kullan */}
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                <div className="text-gray-300 whitespace-pre-wrap">
                  {content}
                </div>
                {tags && tags.trim() && (
                  <div className="flex flex-wrap gap-2">
                    {tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-600/20 text-white rounded-full text-sm"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="capitalize">Priority: {priority}</span>
                  <div className="flex items-center gap-2">
                    <span>Color:</span>
                    <div
                      className="w-4 h-4 rounded-full border border-gray-400"
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
