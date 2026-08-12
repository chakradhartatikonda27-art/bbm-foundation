"use client";

import { useState } from "react";
import { MessageSquare, Mail, Phone, Calendar, ShieldAlert } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  purpose: string;
  message: string;
  createdAt: Date;
}

interface MessagesClientProps {
  messages: ContactMessage[];
}

export default function MessagesClient({ messages }: MessagesClientProps) {
  const [filterPurpose, setFilterPurpose] = useState<string>("ALL");

  const filterTabs = [
    { key: "ALL", label: "All Inbox" },
    { key: "VOLUNTEER", label: "Volunteers" },
    { key: "PARTNERSHIP", label: "Partnerships" },
    { key: "DONATION", label: "Donation Support" },
    { key: "OTHER", label: "General Queries" },
  ];

  const filteredMessages =
    filterPurpose === "ALL"
      ? messages
      : messages.filter((m) => m.purpose === filterPurpose);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Contact Messages</h1>
          <p className="text-slate-400 text-xs mt-0.5">Filter and review volunteer inquiries and partnership details.</p>
        </div>
      </div>

      {/* Filter Tabs Scrollbar */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-800/40">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterPurpose(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap focus:outline-none ${
              filterPurpose === tab.key
                ? "bg-slate-800 text-amber-500 border border-slate-700"
                : "bg-slate-900/50 text-slate-400 hover:text-white border border-slate-800/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Messages Grid */}
      {filteredMessages.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredMessages.map((m) => (
            <div
              key={m.id}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-slate-700 transition-colors animate-fade-up"
            >
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800/60 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">{m.name}</h3>
                  <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/25 mt-2">
                    {m.purpose}
                  </span>
                </div>
                
                <div className="flex flex-col sm:items-end gap-1.5 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <a href={`mailto:${m.email}`} className="hover:text-amber-500 transition-colors">{m.email}</a>
                  </div>
                  {m.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{m.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Body */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Inquiry details:</span>
                <p className="text-xs text-slate-300 leading-relaxed font-light whitespace-pre-wrap">
                  {m.message}
                </p>
              </div>

              {/* Footer info */}
              <div className="text-[9px] text-slate-500 flex items-center gap-1 pt-2">
                <Calendar className="w-3.5 h-3.5 text-slate-600" />
                <span>
                  Received on{" "}
                  {new Date(m.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 max-w-md mx-auto">
          <MessageSquare className="w-12 h-12 text-slate-800 mx-auto" />
          <h3 className="text-sm font-bold text-white">Inbox Clean</h3>
          <p className="text-xs text-slate-500">
            No messages found under the selected category filters.
          </p>
        </div>
      )}
    </div>
  );
}
