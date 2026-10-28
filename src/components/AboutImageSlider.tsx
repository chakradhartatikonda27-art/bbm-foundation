"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Camera } from "lucide-react";

interface SlideImage {
  id: number;
  url: string;
  title: string;
  category: string;
  caption: string;
}

export default function AboutImageSlider() {
  const slides: SlideImage[] = [
    {
      id: 1,
      url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/School_children_at_Nandikotkur_village_Andhra_Pradesh_India.jpg",
      title: "Rural Primary Schooling & Learning Kits",
      category: "Nandikotkur, Andhra Pradesh",
      caption: "Empowering rural primary students with study kits, books, and educational mentorship.",
    },
    {
      id: 2,
      url: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tribal_child.jpg",
      title: "Tribal Child Protection & Care Outreach",
      category: "Nallamala Tribal Belt, AP",
      caption: "Reaching vulnerable children across remote tribal forest settlements with healthcare and family support.",
    },
    {
      id: 3,
      url: "https://upload.wikimedia.org/wikipedia/commons/6/63/Elementary_School.jpg",
      title: "Village Elementary School Revitalization",
      category: "Chittoor, Andhra Pradesh",
      caption: "Revitalizing rural government elementary schools with child-friendly classrooms and study aids.",
    },
    {
      id: 4,
      url: "https://upload.wikimedia.org/wikipedia/commons/2/29/Children_hands_up.jpg",
      title: "Child Labor Prevention & Re-education",
      category: "Ramasamudram, Andhra Pradesh",
      caption: "Rehabilitating underprivileged children from child labor into full-time joyful formal schooling.",
    },
    {
      id: 5,
      url: "https://upload.wikimedia.org/wikipedia/commons/0/09/Members_of_Koi_community.jpg",
      title: "Indigenous Koya Community Development",
      category: "Godavari Tribal Belt, AP",
      caption: "Collaborating with indigenous tribal community elders and families for sustainable welfare.",
    },
    {
      id: 6,
      url: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lambadi_Woman.jpg",
      title: "Tribal Women Empowerment & Livelihood",
      category: "South India Tribal Settlements",
      caption: "Equipping rural and tribal women with self-help skills, dignity, and sustainable family income.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto-rotation timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200 bg-slate-950 group"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slide Image Container */}
      <div className="relative h-[320px] sm:h-[480px] w-full overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <div className="space-y-2 max-w-2xl animate-fade-in">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white shadow-sm">
                  {slide.category}
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                  {slide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                  {slide.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls: Previous / Next Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Play / Pause Toggle & Slide Count */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-mono border border-white/10">
        <span>{currentIndex + 1} / {slides.length}</span>
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="hover:text-emerald-400 transition-colors"
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Bottom Rotatable Thumbnails Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md p-4 border-t border-white/10 flex justify-center items-center gap-3 overflow-x-auto">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`relative rounded-xl overflow-hidden flex-shrink-0 w-14 h-10 sm:w-20 sm:h-12 border-2 transition-all ${
              i === currentIndex
                ? "border-emerald-400 scale-105 shadow-md"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img src={s.url} alt={s.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
