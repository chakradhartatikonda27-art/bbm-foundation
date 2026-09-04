"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ChevronDown, BarChart3, Users, BookOpen, Megaphone, ArrowRight, Camera, Sparkles } from "lucide-react";
import DonateModal from "./DonateModal";

interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string | null;
}

interface Story {
  id: string;
  title: string;
  author: string;
  challenge: string;
  intervention: string;
  outcome: string;
  quote?: string | null;
  imageUrl?: string | null;
}

interface Metric {
  id: string;
  label: string;
  value: string;
  verified: boolean;
}

interface HomePageClientProps {
  programs: Program[];
  stories: Story[];
  metrics: Metric[];
}

export default function HomePageClient({ programs, stories, metrics }: HomePageClientProps) {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<string>("Where Needed Most");

  const openDonate = (purpose?: string) => {
    if (purpose) setSelectedPurpose(purpose);
    setIsDonateOpen(true);
  };

  const galleryImages = [
    {
      title: "Education & School Kits Support",
      category: "Prerna Initiative",
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
    },
    {
      title: "Refresh Camps & Outdoor Recreation",
      category: "Child Wellbeing",
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800",
    },
    {
      title: "Family Reunification & Foster Care",
      category: "Family Preservation",
      img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800",
    },
    {
      title: "Girl Child Safety Workshops",
      category: "Suraksha Program",
      img: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800",
    },
    {
      title: "Youth Leadership Mentorship",
      category: "Swashakti Program",
      img: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800",
    },
    {
      title: "Clean School Infrastructure",
      category: "Ahlada Initiative",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
    },
  ];

  return (
    <div className="flex flex-col w-full animate-fade-up bg-white">
      {/* 1. HERO SECTION (Fullscreen kids banner, VITAL highlighted in green, frosted text overlay box) */}
      <section 
        className="relative min-h-[85vh] sm:min-h-[90vh] -mt-20 pt-32 pb-24 sm:pt-40 sm:pb-28 flex flex-col justify-between items-center text-white bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(15, 30, 20, 0.55), rgba(15, 30, 20, 0.75)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920')"
        }}
        aria-label="Introduction Hero"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 mt-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase leading-[1.15] drop-shadow-lg max-w-5xl mx-auto">
            YOU CAN PLAY A <span className="text-emerald-400 font-extrabold underline decoration-emerald-400 decoration-wavy">VITAL</span> ROLE IN ATTAINING A WORLD WITHOUT ORPHANS
          </h1>

          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-9 rounded-[2.5rem] shadow-2xl text-slate-800 border border-slate-100 transform hover:scale-[1.01] transition-all">
            <p className="text-base sm:text-xl font-medium text-slate-700 leading-relaxed font-sans">
              Everything we do together multiplies, so with your participation, millions of children can grow up in strong families and know their identity with a loving future.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => openDonate("Child & Family Support")}
                className="px-8 py-3.5 rounded-full text-sm font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 transition-all scale-105 active:scale-95 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                I Want To Support Now
              </button>
              <a
                href="#understanding-cause"
                className="px-6 py-3.5 rounded-full text-sm font-bold bg-slate-100 hover:bg-white text-slate-800 transition-all border border-slate-200"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>

        <a
          href="#understanding-cause"
          className="mb-4 w-12 h-12 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-400/40 flex items-center justify-center transition-all animate-bounce"
          aria-label="Scroll to services"
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </section>

      {/* 2. UNDERSTANDING THE ORPHAN CRISIS / SERVICE PILLARS (Enhanced with Card Header Photos) */}
      <section id="understanding-cause" className="py-20 sm:py-28 bg-[#f4f8f5]" aria-labelledby="understanding-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 id="understanding-heading" className="text-3xl sm:text-4xl font-display font-bold text-[#114227]">
              Understanding Our Child & Family Mission
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              How we build a future where every child has a strong family & life opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARD 1: Helping Orphans Through Action */}
            <div className="bg-[#e9f2eb] rounded-[2rem] p-6 sm:p-8 border border-emerald-900/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 overflow-hidden">
              <div className="space-y-4">
                {/* Header Image */}
                <div className="relative rounded-2xl overflow-hidden h-44 shadow-sm border border-emerald-900/10">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"
                    alt="Children in classroom learning"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-sky-600 flex items-center justify-center shadow-md">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-slate-800 leading-tight">
                  Helping Orphans Through Action
                </h3>

                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Learn more about our:</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>Family-strengthening programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>Learning communities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>Hope groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>Educational initiatives</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/get-involved"
                className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-md transition-all"
              >
                I want to act right now
              </Link>
            </div>

            {/* CARD 2: Making A Measurable Difference */}
            <div className="bg-[#e9f2eb] rounded-[2rem] p-6 sm:p-8 border border-emerald-900/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 overflow-hidden">
              <div className="space-y-4">
                {/* Header Image */}
                <div className="relative rounded-2xl overflow-hidden h-44 shadow-sm border border-emerald-900/10">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800"
                    alt="Team studying field impact data"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-sky-600 flex items-center justify-center shadow-md">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-slate-800 leading-tight">
                  Making A Measurable Difference
                </h3>

                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Learn more about our:</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>How we study data & predict our impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>How we gather statistics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>How we measure our success</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/impact"
                className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-md transition-all"
              >
                I want to learn more
              </Link>
            </div>

            {/* CARD 3: Resources To Create Change */}
            <div className="bg-[#e9f2eb] rounded-[2rem] p-6 sm:p-8 border border-emerald-900/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 overflow-hidden">
              <div className="space-y-4">
                {/* Header Image */}
                <div className="relative rounded-2xl overflow-hidden h-44 shadow-sm border border-emerald-900/10">
                  <img
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800"
                    alt="Library and study resources"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-sky-600 flex items-center justify-center shadow-md">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-slate-800 leading-tight">
                  Resources To Create Change
                </h3>

                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Learn more about our:</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>The BBM Roadmap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>Parenting & Care Tips</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>Advocacy Resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>Our vast library of videos & guides</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/our-work"
                className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-md transition-all"
              >
                I want to read more
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HOW YOU CAN HELP ORPHANED & VULNERABLE CHILDREN (Enhanced with Photo Cards for all 3 cards) */}
      <section className="py-20 sm:py-28 bg-white" aria-labelledby="help-children-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 id="help-children-heading" className="text-3xl sm:text-4xl font-display font-bold text-[#114227]">
              How You Can Help Orphaned and Vulnerable Children
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Join hands to make a direct, tangible difference in a child's life today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Card 1: Large Featured Donate Card */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 justify-between items-center relative overflow-hidden">
              <div className="space-y-6 flex-1 z-10">
                <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 leading-tight">
                    Donate to BBM Foundation Today
                  </h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Be the one to bring a <span className="text-purple-600 font-extrabold">significant</span> impact to the life of a child that will not be forgotten.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openDonate("General Donation")}
                  className="inline-flex items-center justify-center py-3.5 px-8 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm shadow-md transition-all scale-105 active:scale-95"
                >
                  I want to donate
                </button>
              </div>

              <div className="w-full md:w-64 relative flex-shrink-0 h-64 md:h-full min-h-[220px]">
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#dcfce7] -z-0"></div>
                
                <div className="absolute top-0 right-0 w-44 h-36 rounded-2xl overflow-hidden shadow-md border-2 border-white z-10 transform -rotate-3 hover:rotate-0 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600"
                    alt="Family silhouette at sunset"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-2 left-4 w-44 h-36 rounded-2xl overflow-hidden shadow-lg border-2 border-white z-20 transform rotate-3 hover:rotate-0 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600"
                    alt="Happy smiling family"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 2 & Card 3 Column */}
            <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
              
              {/* Card 2: Stand with Orphans in Prayer (Enhanced with photo) */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Prayer & Hope Network
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-100 shadow-inner my-2">
                    <img
                      src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600"
                      alt="Hands together supporting each other"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-900">
                    Stand with Children in Prayer & Support
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Unite in purpose. Transform the world.</strong> Join our dedicated support & prayer network.
                  </p>
                </div>

                <Link
                  href="/get-involved"
                  className="inline-flex items-center text-xs font-bold text-[#2563eb] hover:underline pt-2"
                >
                  Join Support Network →
                </Link>
              </div>

              {/* Card 3: Help Children Locally (Enhanced with photo) */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      Local Leadership
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-100 shadow-inner my-2">
                    <img
                      src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600"
                      alt="Local community leaders collaborating"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-900">
                    Help Children Locally
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Join a vibrant community of changemakers—leaders, churches, families, and advocates—working together.
                  </p>
                </div>

                <Link
                  href="/get-involved"
                  className="inline-flex items-center text-xs font-bold text-[#2563eb] hover:underline pt-2"
                >
                  Become a Local Leader →
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. NEW: PHOTO GALLERY / MOMENTS OF HOPE (Rich High-Res Field Photos) */}
      <section className="py-20 sm:py-28 bg-[#f4f8f5] border-t border-slate-200" aria-labelledby="gallery-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-4 h-4" />
              <span>Field Moments & Photo Gallery</span>
            </div>
            <h2 id="gallery-heading" className="text-3xl sm:text-4xl font-display font-extrabold text-[#114227]">
              Moments of Hope Across Our Programs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Real scenes from our school refurbishments, refresh camps, safety workshops, and community centers.
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {galleryImages.map((g, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 aspect-[4/3]"
              >
                <img
                  src={g.img}
                  alt={g.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                    {g.category}
                  </span>
                  <h3 className="text-base font-bold text-white font-display mt-0.5">
                    {g.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#114227] hover:bg-emerald-800 text-white font-black text-xs shadow-md transition-all"
            >
              Read Full Field Stories & Reports
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. ACTIVE PROGRAMS (Database Query Cards) */}
      <section className="py-20 bg-white border-t border-slate-200" aria-labelledby="programs-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">Our Key Initiatives</span>
              <h2 id="programs-heading" className="text-3xl font-display font-bold text-[#114227] mt-1">
                Explore Active Foundation Programs
              </h2>
            </div>
            <Link
              href="/our-work"
              className="inline-flex items-center px-6 py-2.5 rounded-full text-xs font-bold bg-[#114227] text-white hover:bg-emerald-800 transition-all shadow-sm"
            >
              See All Programs
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {prog.imageUrl ? (
                    <img
                      src={prog.imageUrl}
                      alt={prog.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                      No Image Available
                    </div>
                  )}
                  <div className="p-6 space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {prog.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{prog.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-light">
                      {prog.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => openDonate(prog.title)}
                    className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-900 group transition-colors"
                  >
                    Sponsor This Program
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. IMPACT METRICS & VERIFICATION */}
      <section className="py-20 bg-[#f4f8f5]" aria-labelledby="metrics-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#114227] text-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-emerald-900/30">
            <div className="max-w-3xl mb-10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Measurable Reach</span>
              <h2 id="metrics-heading" className="text-3xl sm:text-4xl font-display font-bold">
                Transparent & Audited Community Impact
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-8">
              {metrics.map((m) => (
                <div key={m.id} className="space-y-1">
                  <span className="text-xs text-emerald-200/80 font-medium block">{m.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">{m.value}</span>
                    {m.verified && (
                      <span className="text-[9px] uppercase font-bold text-emerald-400 border border-emerald-400/40 px-1.5 py-0.5 rounded bg-emerald-400/10">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION STRIP */}
      <section className="bg-gradient-to-r from-[#114227] to-[#165a34] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold">
            Ready to Play Your Vital Role?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Your single contribution creates ripples of positive change in children's education, family stability, and community hope.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => openDonate("General Support")}
              className="px-9 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm shadow-xl transition-all scale-105"
            >
              Donate To BBM Foundation Now
            </button>
          </div>
        </div>
      </section>

      {/* Global Donate Modal */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        defaultPurpose={selectedPurpose}
      />
    </div>
  );
}
