"use client";

import { useState } from "react";
import { BarChart3, Plus, Edit2, Trash2, X, Check, ShieldCheck } from "lucide-react";

interface MetricItem {
  id: string;
  label: string;
  value: string;
  description?: string | null;
  verified: boolean;
}

interface MetricsAdminClientProps {
  initialMetrics: MetricItem[];
}

export default function MetricsAdminClient({ initialMetrics }: MetricsAdminClientProps) {
  const [metrics, setMetrics] = useState<MetricItem[]>(initialMetrics);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [verified, setVerified] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setLabel("");
    setValue("");
    setDescription("");
    setVerified(true);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MetricItem) => {
    setEditingId(item.id);
    setLabel(item.label);
    setValue(item.value);
    setDescription(item.description || "");
    setVerified(item.verified);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this impact metric?")) return;

    try {
      const res = await fetch(`/api/admin/metrics/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMetrics((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete metric.");
      }
    } catch {
      alert("Network error deleting metric.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      label,
      value,
      description: description || null,
      verified,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/metrics/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setMetrics((prev) => prev.map((item) => (item.id === editingId ? data.metric : item)));
          setIsModalOpen(false);
          resetForm();
        } else {
          alert(data.error || "Failed to update metric.");
        }
      } else {
        const res = await fetch("/api/admin/metrics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setMetrics((prev) => [...prev, data.metric]);
          setIsModalOpen(false);
          resetForm();
        } else {
          alert(data.error || "Failed to add metric.");
        }
      }
    } catch {
      alert("Network error saving metric.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black font-display text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-emerald-400" />
            <span>Impact Metrics CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage impact counters (e.g. 1,70,000+ Children Empowered, 450+ Adopted Centers) displayed on the homepage.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Metric</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-display text-emerald-400">{item.value}</span>
                {item.verified && (
                  <span title="Verified Metric">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold font-display text-white">{item.label}</h3>
              {item.description && (
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                title="Edit metric"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:bg-rose-900 transition-all"
                title="Delete metric"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {metrics.length === 0 && (
          <div className="col-span-full bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 text-slate-700" />
            <p className="font-semibold text-sm">No metrics found. Click "Add New Metric" to create one.</p>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 my-auto shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold font-display text-white">
                {editingId ? "Edit Metric" : "Add Impact Metric"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Display Metric Value *</label>
                <input
                  type="text"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g. 1,70,000+ or 450+"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Metric Title / Label *</label>
                <input
                  type="text"
                  required
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. Children & Families Empowered"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Deserving children provided with learning kits, family care, and academic support."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={verified}
                  onChange={(e) => setVerified(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="verified" className="text-xs text-slate-300 font-bold">
                  Show Verified Badge
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
                  {isSaving ? "Saving..." : editingId ? "Update Metric" : "Add Metric"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
