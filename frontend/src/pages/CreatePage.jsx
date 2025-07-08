import { useState } from "react";
import {ArrowLeftIcon} from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import apiClient from "../lib/axios";


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("medium");
  const [color, setColor] = useState("#fb923c");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const colorPalette = [
    { name: "Hellgelb", value: "#fff9c4" },
    { name: "Blau", value: "#bbdefb" },
    { name: "Grün", value: "#c8e6c9" },
    { name: "Gelb", value: "#fff59d" },
    { name: "Rosa", value: "#f8bbd9" },
    { name: "Orange", value: "#fb923c" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Leerzeichenkontrolle
    if (!title.trim() || !content.trim()) {
      toast.error("Titel und Inhalt dürfen nicht leer sein!");
      return;
    }

    setLoading(true);
    try {
      // Konvertiere Tags in ein Array und filtere die leeren Elemente
      const tagsArray = tags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
      
      const response = await apiClient.post("/notes", { 
        title: title.trim(), 
        content: content.trim(),
        tags: tagsArray,
        priority,
        color
      });
      toast.success("Note created successfully!");
      navigate("/");
      console.log("Note created:", response.data);
      setTitle("");
      setContent("");
      setTags("");
      setPriority("medium");
      setColor("#ffffff");
    } catch (error) {
      console.error("Error creating note:", error);
      error.response && error.response.status === 429
        ? toast.error("Zu viele Anfragen! Bitte warte einen Moment.", {
        duration: 5000,
        icon: "🚫",
          })
        : toast.error("Failed to create note!");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          { /* Card for creating a new note */}
          <div className="card bg-gradient-to-br from-green-900 to-black shadow-lg">
            { /* Card header with title */}
            <div className="card-body">
              <h2 className="card-title">Create a New Note</h2>
              <form onSubmit={handleSubmit} className="space-y-4 relative pb-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full rounded-full bg-green-900"
                    required
                  />
                </div>
                { /* Textarea for note content */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea textarea-bordered w-full rounded-2xl bg-green-900"
                    rows={6}
                    required
                  />
                </div>
                { /* Input for tags */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tags (Komma-getrennt)</span>
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="input input-bordered w-full rounded-full bg-green-900"
                    placeholder="z.B. #arbeit, #wichtig, #projekt"
                  />
                </div>
                { /* Grid for priority and color selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Priority</span>
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="select select-bordered w-full rounded-2xl bg-green-900"
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Notiz Farbe</span>
                    </label>
                    <div className="grid grid-cols-6 gap-2 p-1 bg-green-900 rounded-full">
                      {colorPalette.map((colorOption) => (
                        <button
                          key={colorOption.value}
                          type="button"
                          onClick={() => setColor(colorOption.value)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                            color === colorOption.value 
                              ? 'border-primary ring-2 ring-primary ring-offset-2' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: colorOption.value }}
                          title={colorOption.name}
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-400">Spezielle Farbe:</span>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-8 h-8 rounded-lg border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className={`btn btn-success rounded-full text-black ${loading ? "loading" : ""}`}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;