"use client";

import { useState, useTransition } from "react";
import { Edit2, Trash2, Plus, X, Check, Eye, ToggleLeft, ShieldAlert } from "lucide-react";
import { createProgram, updateProgram, deleteProgram } from "@/app/actions/programs";

import ImageUploadInput from "@/components/ImageUploadInput";

interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string | null;
  status: string;
  verified: boolean;
}

interface ProgramsClientProps {
  programs: Program[];
}

export default function ProgramsClient({ programs }: ProgramsClientProps) {
  const [isPending, startTransition] = useTransition();
  const [formMode, setFormMode] = useState<"list" | "create" | "edit">("list");
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formImageUrl, setFormImageUrl] = useState<string>("");

  const categories = [
    { value: "EDUCATION", label: "Education" },
    { value: "SKILLS", label: "Skill Development" },
    { value: "WOMEN_FAMILY", label: "Women & Families" },
    { value: "YOUTH", label: "Youth Development" },
    { value: "HEALTH", label: "Health & Wellbeing" },
    { value: "COMMUNITY", label: "Community Development" },
  ];

  const handleEditClick = (prog: Program) => {
    setEditingProgram(prog);
    setFormImageUrl(prog.imageUrl || "");
    setFormMode("edit");
    setError(null);
  };

  const handleCreateClick = () => {
    setEditingProgram(null);
    setFormImageUrl("");
    setFormMode("create");
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteProgram(id);
      if (!res.success) {
        setError(res.error || "Failed to delete program.");
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
        res = await createProgram(formData);
      } else {
        res = await updateProgram(editingProgram!.id, formData);
      }

      if (res && !res.success) {
        setError(res.error || "Operation failed.");
      } else {
        setFormMode("list");
        setEditingProgram(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Programs Manager</h1>
          <p className="text-slate-400 text-xs mt-0.5">Create, edit, and organize foundation program initiatives.</p>
        </div>
        
        {formMode === "list" ? (
          <button
            onClick={handleCreateClick}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Program
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

      {/* 1. Form view */}
      {formMode !== "list" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 max-w-2xl">
          <h2 className="text-base font-bold text-white font-display">
            {formMode === "create" ? "Add New Program" : `Edit Program: ${editingProgram?.title}`}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="title" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Program Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={editingProgram?.title || ""}
                placeholder="e.g. Skill Development Workshop"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 h-12 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="category" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Program Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue={editingProgram?.category || "EDUCATION"}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 h-12 text-xs text-white focus:outline-none focus:border-amber-500 appearance-none"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="status" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Operational Status
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  defaultValue={editingProgram?.status || "ACTIVE"}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 h-12 text-xs text-white focus:outline-none focus:border-amber-500 appearance-none"
                >
                  <option value="ACTIVE">Active (Published)</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <input type="hidden" name="imageUrl" value={formImageUrl} />
              <ImageUploadInput
                label="Upload Program Photo from Computer / Drive"
                value={formImageUrl}
                onChange={(url) => setFormImageUrl(url)}
              />

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="verified" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Statutory Verification
                </label>
                <select
                  id="verified"
                  name="verified"
                  required
                  defaultValue={editingProgram?.verified ? "true" : "false"}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 h-12 text-xs text-white focus:outline-none focus:border-amber-500 appearance-none"
                >
                  <option value="false">Audit Pending (Display placeholder status)</option>
                  <option value="true">Fully Verified (Confirm statutory authenticity)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="description" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                defaultValue={editingProgram?.description || ""}
                placeholder="Provide a detailed description of this program, target demographic, and structural achievements."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow disabled:opacity-50"
            >
              {isPending ? "Saving changes..." : formMode === "create" ? "Create Program" : "Save Changes"}
            </button>
          </form>
        </div>
      )}

      {/* 2. Grid Table View */}
      {formMode === "list" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          {programs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="p-4 sm:p-5">Title</th>
                    <th className="p-4 sm:p-5">Category</th>
                    <th className="p-4 sm:p-5">Status</th>
                    <th className="p-4 sm:p-5">Verification</th>
                    <th className="p-4 sm:p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {programs.map((prog) => (
                    <tr key={prog.id} className="hover:bg-slate-800/35 transition-colors">
                      <td className="p-4 sm:p-5">
                        <strong className="block text-white font-bold">{prog.title}</strong>
                        <span className="block text-[10px] text-slate-500 font-light truncate max-w-xs">{prog.description}</span>
                      </td>
                      <td className="p-4 sm:p-5">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-semibold tracking-wider uppercase text-[9px]">
                          {prog.category}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5">
                        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          prog.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                        }`}>
                          {prog.status}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5">
                        {prog.verified ? (
                          <span className="text-emerald-500 flex items-center gap-1 font-semibold">
                            <Check className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="text-amber-500 flex items-center gap-1">
                            <ToggleLeft className="w-3.5 h-3.5" />
                            Audit Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(prog)}
                          className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-600 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(prog.id)}
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
              <span className="block text-sm font-bold text-white">No Programs Loaded</span>
              <span className="block text-xs text-slate-500">Create a new program using the button above.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
