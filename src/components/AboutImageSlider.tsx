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
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200",
      title: "Interactive Classroom & Quality Education",
      category: "Prerna Initiative",
      caption: "Empowering young learners with modern digital tools, study kits, and school supplies.",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200",
      title: "Girl Child Safety & Self-Defence Training",
      category: "Suraksha Program",
      caption: "Building physical confidence and personal safety awareness for school girls in local communities.",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
      title: "School Infrastructure & Sanitation Renovation",
      category: "Ahlada Initiative",
      caption: "Renovating government schools, setting up computer labs, and constructing clean sanitation blocks.",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
      title: "Community Refresh Camps & Rest Retreats",
      category: "Child Wellbeing",
      caption: "Bringing together foster families, adoptive parents, and children for outdoor camps and rest retreats.",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200",
      title: "Swashakti Youth Leadership Mentorship",
      category: "Youth Empowerment",
      caption: "Fostering career guidance, hygiene awareness, and leadership mentorship for young adults.",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200",
      title: "Family Reunification & Foster Care Support",
      category: "Family Preservation",
      caption: "Helping children grow up within safe, loving families through community support networks.",
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
