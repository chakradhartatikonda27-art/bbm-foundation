"use client";

import { useState } from "react";
import { Image as ImageIcon, Plus, Edit2, Trash2, X, Check, ArrowUp, ArrowDown } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  order: number;
}

interface GalleryAdminClientProps {
  initialImages: GalleryItem[];
}

export default function GalleryAdminClient({ initialImages }: GalleryAdminClientProps) {
  const [images, setImages] = useState<GalleryItem[]>(initialImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Prerna Initiative");
  const [imageUrl, setImageUrl] = useState("");
  const [order, setOrder] = useState(0);

  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setCategory("Prerna Initiative");
    setImageUrl("");
    setOrder(images.length);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setOrder(item.order);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setImages((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete gallery image.");
      }
    } catch {
      alert("Network error deleting gallery image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      title,
      category,
      imageUrl,
      order: Number(order),
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/gallery/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setImages((prev) => prev.map((item) => (item.id === editingId ? data.image : item)));
          setIsModalOpen(false);
          resetForm();
        } else {
          alert(data.error || "Failed to update gallery image.");
        }
      } else {
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setImages((prev) => [...prev, data.image]);
          setIsModalOpen(false);
          resetForm();
        } else {
          alert(data.error || "Failed to add gallery image.");
        }
      }
    } catch {
      alert("Network error saving gallery image.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black font-display text-white tracking-tight flex items-center gap-3">
            <ImageIcon className="w-7 h-7 text-emerald-400" />
            <span>Photo Gallery & Moments CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage rotatable gallery photos, captions, and display ordering across the homepage & about page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Photo</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-xl group">
            <div className="space-y-3">
              <div className="h-48 rounded-2xl overflow-hidden border border-slate-800 relative">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-slate-950/80 px-2.5 py-1 rounded-full backdrop-blur-sm border border-emerald-500/30">
                  {item.category}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold font-display text-white">{item.title}</h3>
                <span className="text-[10px] text-slate-500 font-mono">Display Order: {item.order}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                title="Edit image"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:bg-rose-900 transition-all"
                title="Delete image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-full bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-700" />
            <p className="font-semibold text-sm">No photo gallery items. Click "Add New Photo" to add one.</p>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 my-auto shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold font-display text-white">
                {editingId ? "Edit Gallery Photo" : "Add Gallery Photo"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Photo Title / Caption *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Education & School Kits Support"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Category / Tag *</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Child Wellbeing / Prerna Initiative"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Display Sort Order</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
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
                  {isSaving ? "Saving..." : editingId ? "Update Photo" : "Add Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
