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
      url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1200",
      title: "Interactive Classroom & Quality Education in Andhra Pradesh",
      category: "Prerna Initiative",
      caption: "Empowering young students in rural schools with study kits, digital tools, and bright learning spaces.",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1608408891486-ee21896898d9?q=80&w=1200",
      title: "Girl Child Safety & Education Drive",
      category: "Suraksha Program",
      caption: "Building physical confidence, school retention, and personal safety awareness for young girls in village communities.",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200",
      title: "Village School Renovation & Digital Labs",
      category: "Ahlada Initiative",
      caption: "Upgrading government schools in Narsipatnam & Anakapalli with clean sanitation, libraries, and computer labs.",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1200",
      title: "Rural Health Screening & Community Support",
      category: "Community Wellbeing",
      caption: "Bringing together local mothers, self-help groups, and children for health checkup camps and wellness workshops.",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
      title: "Swashakti Tribal Youth Leadership Mentorship",
      category: "Youth Empowerment",
      caption: "Providing vocational training, career counseling, and leadership mentorship for tribal youth across Araku Valley.",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?q=80&w=1200",
      title: "Family Preservation & Foster Care Support",
      category: "Family Care",
      caption: "Helping children grow up safely within loving families through self-help micro-enterprises and community care networks.",
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
