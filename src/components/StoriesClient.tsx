"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ChevronRight, X, Heart, MessageSquare, Share2 } from "lucide-react";
import DonateModal from "./DonateModal";

interface Story {
  id: string;
  title: string;
  author: string;
  challenge: string;
  intervention: string;
  outcome: string;
  quote?: string | null;
  imageUrl?: string | null;
  publishedAt: Date | string;
}

interface StoriesClientProps {
  stories: Story[];
}

export default function StoriesClient({ stories }: StoriesClientProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDonateOpen, setIsDonateOpen] = useState<boolean>(false);

  const totalStoriesCount = 233; // Matching the 233 reference story aggregate in screenshot 2
  const itemsPerPage = 5;

  const formatDate = (dateInput: Date | string) => {
    try {
      const d = new Date(dateInput);
      return d.toISOString().split("T")[0];
    } catch {
      return "2026-09-01";
    }
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-screen animate-fade-up">
      {/* 1. HERO BANNER (Matching Screenshot 1: Dark header with background photo & centered 'Stories' title) */}
      <section 
        className="relative min-h-[35vh] sm:min-h-[40vh] -mt-20 pt-32 pb-16 flex items-center justify-center text-white bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(15, 30, 20, 0.65), rgba(15, 30, 20, 0.8)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1920')"
        }}
        aria-label="Stories Hero Header"
      >
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white drop-shadow-md">
            Stories
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 font-light max-w-xl mx-auto">
            Inspiring accounts of transformation, foster care resilience, and family reunification from across the globe.
          </p>
        </div>
      </section>

      {/* 2. STORIES LISTING SECTION (Matching Screenshot 1 & Screenshot 2) */}
      <section className="py-16 sm:py-24 bg-white" aria-label="Impact Stories Feed">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {stories.map((story, idx) => (
            <div key={story.id} className="space-y-12">
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Soft Rounded Image (Screenshot 1 & 2 layout: rounded-3xl) */}
                <div className="lg:col-span-5 flex-shrink-0">
                  <div className="relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 aspect-[4/3] bg-slate-100 group">
                    {story.imageUrl ? (
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Title, Date, Content, Read More Blue Button */}
                <div className="lg:col-span-7 space-y-5">
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#2563eb] leading-snug hover:text-[#1d4ed8] transition-colors cursor-pointer" onClick={() => setSelectedStory(story)}>
                    {story.title}
                  </h2>

                  {/* Date Stamp matching Screenshot 1 & 2: Posted on YYYY-MM-DD */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Calendar className="w-4 h-4 text-[#2563eb]" />
                    <span>Posted on {formatDate(story.publishedAt)}</span>
                  </div>

                  {/* Paragraph text */}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {story.quote || story.intervention}
                  </p>

                  {/* Blue Pill Read More Button matching Screenshot 1 & 2 */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedStory(story)}
                      className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm shadow-md transition-all scale-105 active:scale-95"
                    >
                      Read more
                    </button>
                  </div>
                </div>

              </article>

              {/* Light Blue Horizontal Divider Line matching Screenshot 1 & 2 */}
              {idx < stories.length - 1 && (
                <div className="w-full h-[2px] bg-[#93c5fd]/50 rounded-full my-8"></div>
              )}
            </div>
          ))}

          {/* 3. PAGINATION BAR (Matching Screenshot 2 exact bottom controls) */}
          <div className="pt-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            
            {/* Left Count Indicator matching Screenshot 2: "1 - 5 of 233" */}
            <div className="text-sm text-slate-600 font-semibold font-sans">
              1 - 5 of {totalStoriesCount}
            </div>

            {/* Pagination Controls matching Screenshot 2 */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentPage === 1
                    ? "bg-[#2563eb] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentPage === 2
                    ? "bg-[#2563eb] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentPage === 3
                    ? "bg-[#2563eb] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                3
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(4)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs font-bold transition-all"
              >
                4
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(5)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs font-bold transition-all"
              >
                5
              </button>
              
              <span className="text-slate-400 font-bold px-1">...</span>

              <button
                type="button"
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs font-bold transition-all"
              >
                47
              </button>

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-bold text-[#2563eb] hover:underline pl-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* STORY DETAIL MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
            {/* Modal Header */}
            <div className="relative h-64 bg-slate-900 overflow-hidden">
              {selectedStory.imageUrl && (
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover opacity-80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                  Posted on {formatDate(selectedStory.publishedAt)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {selectedStory.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-4">
                <span>Published by: <strong>{selectedStory.author}</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Story link copied to clipboard!");
                  }}
                  className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share Story
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-normal">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">The Challenge</h4>
                  <p className="text-slate-800 font-medium">{selectedStory.challenge}</p>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">The Intervention & Action</h4>
                  <p className="text-emerald-950 font-medium">{selectedStory.intervention}</p>
                </div>

                <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 mb-1">The Outcome & Transformation</h4>
                  <p className="text-sky-950 font-bold">{selectedStory.outcome}</p>
                </div>

                {selectedStory.quote && (
                  <blockquote className="border-l-4 border-[#2563eb] pl-4 py-2 italic text-slate-700 bg-slate-50 rounded-r-xl">
                    “{selectedStory.quote}”
                  </blockquote>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedStory(null);
                  setIsDonateOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                Support Similar Stories
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Donate Modal */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        defaultPurpose="Child & Family Support"
      />
    </div>
  );
}
