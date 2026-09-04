"use client";

import { useState } from "react";
import { GraduationCap, Plus, Edit2, Trash2, X, Check, FileText, Video, BookOpen, ExternalLink, Star } from "lucide-react";

interface ResourceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  linkUrl?: string | null;
  format: string;
  featured: boolean;
}

interface ResourcesAdminClientProps {
  initialResources: ResourceItem[];
}

export default function ResourcesAdminClient({ initialResources }: ResourcesAdminClientProps) {
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("E_LEARNING");
  const [description, setDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [format, setFormat] = useState("PDF");
  const [featured, setFeatured] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setCategory("E_LEARNING");
    setDescription("");
    setLinkUrl("");
    setFormat("PDF");
    setFeatured(false);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (resItem: ResourceItem) => {
    setEditingId(resItem.id);
    setTitle(resItem.title);
    setCategory(resItem.category);
    setDescription(resItem.description);
    setLinkUrl(resItem.linkUrl || "");
    setFormat(resItem.format);
    setFeatured(resItem.featured);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    try {
      const res = await fetch(`/api/admin/resources/${id}`, { method: "DELETE" });
      if (res.ok) {
        setResources((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete resource.");
      }
    } catch {
      alert("Network error deleting resource.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      title,
      category,
      description,
      linkUrl: linkUrl || null,
      format,
      featured,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/resources/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setResources((prev) => prev.map((item) => (item.id === editingId ? data.resource : item)));
          setIsModalOpen(false);
          resetForm();
        } else {
          alert(data.error || "Failed to update resource.");
        }
      } else {
        const res = await fetch("/api/admin/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setResources((prev) => [data.resource, ...prev]);
          setIsModalOpen(false);
          resetForm();
        } else {
          alert(data.error || "Failed to create resource.");
        }
      }
    } catch {
      alert("Network error saving resource.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black font-display text-white tracking-tight flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-emerald-400" />
            <span>Resources & E-Learning CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage E-learning courses, downloadable guides, roadmap materials, videos, and hope group toolkits.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Resource</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                  {item.category.replace("_", " ")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.format}
                  </span>
                  {item.featured && (
                    <Star className="w-4 h-4 text-amber-400 fill-current" title="Featured Resource" />
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold font-display text-white leading-tight">{item.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{item.description}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              {item.linkUrl ? (
                <a href={item.linkUrl} target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-500">Internal Document</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                  title="Edit resource"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:bg-rose-900 transition-all"
                  title="Delete resource"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {resources.length === 0 && (
          <div className="col-span-full bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-slate-700" />
            <p className="font-semibold text-sm">No resources found. Click "Add New Resource" to create one.</p>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 my-auto shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold font-display text-white">
                {editingId ? "Edit Resource" : "Create New Resource"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. BBM Roadmap to Family Strengthening 2026"
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
                    <option value="E_LEARNING">E-Learning</option>
                    <option value="ROADMAP">Roadmap</option>
                    <option value="VIDEO">Video Series</option>
                    <option value="COMMUNITY">Community Toolkit</option>
                    <option value="PROTECTION_DAY">Child Protection Day</option>
                    <option value="HOPE_GROUPS">Hope Groups</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Format</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="PDF">PDF Guide</option>
                    <option value="VIDEO">Video Course</option>
                    <option value="COURSE">Interactive Module</option>
                    <option value="TOOLKIT">Toolkit Zip/Doc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of course / download guide..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Download / Access URL</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="featured" className="text-xs text-slate-300 font-bold">
                  Mark as Featured Resource
                </label>
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
                  {isSaving ? "Saving..." : editingId ? "Update Resource" : "Create Resource"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
