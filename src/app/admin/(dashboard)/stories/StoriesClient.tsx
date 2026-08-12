"use client";

import { useState, useTransition } from "react";
import { Edit2, Trash2, Plus, X, ShieldAlert } from "lucide-react";
import { createStory, updateStory, deleteStory } from "@/app/actions/stories";

interface Story {
  id: string;
  title: string;
  author: string;
  challenge: string;
  intervention: string;
  outcome: string;
  quote: string | null;
  imageUrl: string | null;
  publishedAt: Date;
}

interface StoriesClientProps {
  stories: Story[];
}

export default function StoriesClient({ stories }: StoriesClientProps) {
  const [isPending, startTransition] = useTransition();
  const [formMode, setFormMode] = useState<"list" | "create" | "edit">("list");
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEditClick = (story: Story) => {
    setEditingStory(story);
    setFormMode("edit");
    setError(null);
  };

  const handleCreateClick = () => {
    setEditingStory(null);
    setFormMode("create");
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story of change?")) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteStory(id);
      if (!res.success) {
        setError(res.error || "Failed to delete story.");
      } else {
        setFormMode("list");
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      let res;
      if (formMode === "create") {
        res = await createStory(formData);
      } else {
        res = await updateStory(editingStory!.id, formData);
      }

      if (res && !res.success) {
        setError(res.error || "Operation failed.");
      } else {
        setFormMode("list");
        setEditingStory(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Stories of Change Manager</h1>
          <p className="text-slate-400 text-xs mt-0.5">Write and manage beneficiary and community impact accounts.</p>
        </div>

        {formMode === "list" ? (
          <button
            onClick={handleCreateClick}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Write Story
          </button>
        ) : (
          <button
            onClick={() => setFormMode("list")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel Form
          </button>
        )}
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-4 rounded-xl text-xs flex gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form View */}
      {formMode !== "list" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 max-w-2xl">
          <h2 className="text-base font-bold text-white font-display">
            {formMode === "create" ? "Add Impact Story" : `Edit Story: ${editingStory?.title}`}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="title" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Story Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  defaultValue={editingStory?.title || ""}
                  placeholder="e.g. Geeta's Journey to Self-Reliance"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 h-12 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="author" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Report Author / Coordinator *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  defaultValue={editingStory?.author || ""}
                  placeholder="e.g. Program Director"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 h-12 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="imageUrl" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Beneficiary Photograph URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  defaultValue={editingStory?.imageUrl || ""}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 h-12 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="quote" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Beneficiary Direct Quote
                </label>
                <input
                  type="text"
                  id="quote"
                  name="quote"
                  defaultValue={editingStory?.quote || ""}
                  placeholder="e.g. BBM Foundation gave me a pathway to stand on my own feet."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 h-12 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="challenge" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                The Challenge Description *
              </label>
              <textarea
                id="challenge"
                name="challenge"
                required
                rows={3}
                defaultValue={editingStory?.challenge || ""}
                placeholder="Describe the initial struggles, barriers, or local deficits the beneficiary faced."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="intervention" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                The Intervention (Our Support) *
              </label>
              <textarea
                id="intervention"
                name="intervention"
                required
                rows={3}
                defaultValue={editingStory?.intervention || ""}
                placeholder="Describe how BBM Foundation acted (enrollment in classes, tools delivered, scholarships)."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="outcome" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                The Outcome (Impact) *
              </label>
              <textarea
                id="outcome"
                name="outcome"
                required
                rows={3}
                defaultValue={editingStory?.outcome || ""}
                placeholder="Describe the final self-reliance or local capacity milestone achieved."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow disabled:opacity-50"
            >
              {isPending ? "Publishing story..." : formMode === "create" ? "Publish Story" : "Save Changes"}
            </button>
          </form>
        </div>
      )}

      {/* Grid Table View */}
      {formMode === "list" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          {stories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="p-4 sm:p-5">Story Title</th>
                    <th className="p-4 sm:p-5">Author</th>
                    <th className="p-4 sm:p-5">Intervention Scope</th>
                    <th className="p-4 sm:p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {stories.map((story) => (
                    <tr key={story.id} className="hover:bg-slate-800/35 transition-colors">
                      <td className="p-4 sm:p-5">
                        <strong className="block text-white font-bold">{story.title}</strong>
                        <span className="block text-[10px] text-slate-500 font-light truncate max-w-xs">{story.challenge}</span>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400">
                        {story.author}
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400 truncate max-w-xs">
                        {story.intervention}
                      </td>
                      <td className="p-4 sm:p-5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(story)}
                          className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-600 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(story.id)}
                          className="p-1.5 rounded-lg border border-slate-800 hover:border-rose-900 hover:text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 space-y-2">
              <span className="block text-sm font-bold text-white">No Impact Stories Recorded</span>
              <span className="block text-xs text-slate-500">Publish a new story using the button above.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
