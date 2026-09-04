"use client";

import { useState } from "react";
import { Calendar, Plus, Edit2, Trash2, X, Check, MapPin, User, Link as LinkIcon, Sparkles } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  speakerName?: string | null;
  speakerRole?: string | null;
  speakerBio?: string | null;
  imageUrl?: string | null;
  registrationLink?: string | null;
  status: string;
}

interface EventsAdminClientProps {
  initialEvents: EventItem[];
}

export default function EventsAdminClient({ initialEvents }: EventsAdminClientProps) {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("REGIONAL_GATHERING");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [speakerRole, setSpeakerRole] = useState("");
  const [speakerBio, setSpeakerBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [status, setStatus] = useState("UPCOMING");

  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setCategory("REGIONAL_GATHERING");
    setDate("");
    setLocation("");
    setDescription("");
    setSpeakerName("");
    setSpeakerRole("");
    setSpeakerBio("");
    setImageUrl("");
    setRegistrationLink("");
    setStatus("UPCOMING");
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event: EventItem) => {
    setEditingId(event.id);
    setTitle(event.title);
    setCategory(event.category);
    setDate(event.date);
    setLocation(event.location);
    setDescription(event.description);
    setSpeakerName(event.speakerName || "");
    setSpeakerRole(event.speakerRole || "");
    setSpeakerBio(event.speakerBio || "");
    setImageUrl(event.imageUrl || "");
    setRegistrationLink(event.registrationLink || "");
    setStatus(event.status);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete event.");
      }
    } catch {
      alert("Network error deleting event.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      title,
      category,
      date,
      location,
      description,
      speakerName: speakerName || null,
      speakerRole: speakerRole || null,
      speakerBio: speakerBio || null,
      imageUrl: imageUrl || null,
      registrationLink: registrationLink || null,
      status,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/events/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setEvents((prev) => prev.map((item) => (item.id === editingId ? data.event : item)));
          setIsModalOpen(false);
          resetForm();
        } else {
          alert(data.error || "Failed to update event.");
        }
      } else {
        const res = await fetch("/api/admin/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setEvents((prev) => [data.event, ...prev]);
          setIsModalOpen(false);
          resetForm();
        } else {
          alert(data.error || "Failed to create event.");
        }
      }
    } catch {
      alert("Network error saving event.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black font-display text-white tracking-tight flex items-center gap-3">
            <Calendar className="w-7 h-7 text-emerald-400" />
            <span>Events & Gatherings CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage WWO gatherings, regional conferences, keynote speakers, and registration links.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Events Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden group">
            <div className="space-y-3">
              {event.imageUrl && (
                <div className="h-40 rounded-2xl overflow-hidden mb-3 border border-slate-800">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                  {event.category.replace("_", " ")}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  event.status === "UPCOMING" ? "bg-sky-950 text-sky-400 border border-sky-800" : "bg-slate-800 text-slate-400"
                }`}>
                  {event.status}
                </span>
              </div>

              <h3 className="text-lg font-bold font-display text-white leading-tight">{event.title}</h3>
              
              <div className="space-y-1 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
                {event.speakerName && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <User className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Speaker: {event.speakerName} ({event.speakerRole || "Guest"})</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{event.description}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleOpenEdit(event)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                title="Edit event"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(event.id)}
                className="p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:bg-rose-900 transition-all"
                title="Delete event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="col-span-full bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-700" />
            <p className="font-semibold text-sm">No events found. Click "Add New Event" to create one.</p>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 my-auto shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold font-display text-white">
                {editingId ? "Edit Event" : "Create New Event"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. WWO Global Leaders Summit 2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="REGIONAL_GATHERING">Regional Gathering</option>
                    <option value="WEBINAR">Webinar</option>
                    <option value="CONFERENCE">Conference</option>
                    <option value="WORKSHOP">Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="UPCOMING">Upcoming</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date & Time *</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Nov 14-16, 2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-medium text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Convention Center, Hyderabad"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-medium text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Event schedule, theme, and highlights..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Speaker Name</label>
                  <input
                    type="text"
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    placeholder="e.g. Dr. Ruslan Maliuta"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Speaker Role</label>
                  <input
                    type="text"
                    value={speakerRole}
                    onChange={(e) => setSpeakerRole(e.target.value)}
                    placeholder="e.g. Global Facilitator"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  {isSaving ? "Saving..." : editingId ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
