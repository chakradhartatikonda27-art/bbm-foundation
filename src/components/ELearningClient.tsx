"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Play, CheckCircle, Clock, Users, ArrowRight, Heart, X, Award, ShieldCheck } from "lucide-react";
import DonateModal from "../components/DonateModal";

interface Course {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  customDiagram?: boolean;
  duration: string;
  modulesCount: number;
}

export default function ELearningClient() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledSuccess, setEnrolledSuccess] = useState<boolean>(false);
  const [isDonateOpen, setIsDonateOpen] = useState<boolean>(false);

  const courses: Course[] = [
    {
      id: "course-1",
      title: "BBM Roadmap Forum Resources and Training",
      author: "By BBM Foundation & WWO Team",
      description: "The Roadmap Forum for a World Without Orphans unites local and national leaders to address the needs of vulnerable children. This course is intended to show you how to build your own.",
      customDiagram: true,
      duration: "3 Hours • 6 Modules",
      modulesCount: 6,
    },
    {
      id: "course-2",
      title: "Servant Leadership",
      author: "By Ruby M. Johnston",
      description: "At BBM Foundation, servant leadership is more than just a leadership style—it is one way we live out our vision of seeing every child thrive within a safe and loving family. It reflects our core values and cornerstones, guiding how we serve children, families, and one another. Servant leadership also connects directly with the BBM Roadmap, strengthening not only Living Refreshed, but also the other three foundations—Collaboration, Prevention, and Intervention—that together shape how we pursue our mission. By rooting servant leadership in our vision, values, and Roadmap, we ensure that the way we lead remains aligned with the heart of who we are and what we are called to do.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
      duration: "4.5 Hours • 8 Modules",
      modulesCount: 8,
    },
    {
      id: "course-3",
      title: "Family Reunification & Foster Care Best Practices",
      author: "By Dr. Rachel Stevens",
      description: "Practical field frameworks for social workers, community leaders, and foster parents on building safe family transition environments.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
      duration: "2.5 Hours • 5 Modules",
      modulesCount: 5,
    },
    {
      id: "course-4",
      title: "Trauma-Informed Care & Hope Group Facilitation",
      author: "By Regional Caregiver Council",
      description: "Equipping volunteers and church leaders to lead emotional recovery groups and community support circles for vulnerable children.",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800",
      duration: "3.5 Hours • 7 Modules",
      modulesCount: 7,
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white animate-fade-up min-h-screen">
      {/* 1. HERO HEADER (Matching Screenshot: Dark background with centered 'E-learning' title) */}
      <section 
        className="relative min-h-[32vh] sm:min-h-[38vh] -mt-20 pt-32 pb-16 flex items-center justify-center text-white bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(15, 30, 20, 0.65), rgba(15, 30, 20, 0.8)), url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920')"
        }}
        aria-label="E-learning Hero Header"
      >
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white drop-shadow-md">
            E-learning
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 font-light max-w-xl mx-auto">
            Free online courses, leadership modules, and Roadmap training for child advocates & community leaders.
          </p>
        </div>
      </section>

      {/* 2. E-LEARNING COURSES FEED (Matching Screenshot Layout: Light rounded container, 4-quadrant graphic, Servant Leadership) */}
      <section className="py-16 sm:py-24 bg-[#f4f8f5]" aria-labelledby="courses-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="bg-[#e9f2eb] rounded-[2.5rem] p-8 sm:p-12 border border-emerald-900/10 shadow-sm space-y-12">
            
            {courses.map((course, idx) => (
              <div key={course.id} className="space-y-12">
                
                <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Left Column: Graphic / Image (Matching Screenshot 1) */}
                  <div className="lg:col-span-4 flex-shrink-0">
                    {course.customDiagram ? (
                      /* 4-Quadrant Circular Roadmap Graphic matching Screenshot 1 */
                      <div className="relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 aspect-square bg-white p-6 flex items-center justify-center">
                        <div className="relative w-full h-full max-w-[240px] max-h-[240px] rounded-full border-4 border-slate-200 flex items-center justify-center p-2">
                          <div className="grid grid-cols-2 gap-1.5 w-full h-full rounded-full overflow-hidden">
                            <div className="bg-sky-100 p-2 flex flex-col items-center justify-center text-center text-sky-800 border-r border-b border-white">
                              <span className="text-[9px] font-black uppercase tracking-wider">Prevention</span>
                            </div>
                            <div className="bg-emerald-100 p-2 flex flex-col items-center justify-center text-center text-emerald-800 border-b border-white">
                              <span className="text-[9px] font-black uppercase tracking-wider">Broadscale Collaboration</span>
                            </div>
                            <div className="bg-amber-100 p-2 flex flex-col items-center justify-center text-center text-amber-800 border-r border-white">
                              <span className="text-[9px] font-black uppercase tracking-wider">Living Refreshed</span>
                            </div>
                            <div className="bg-rose-100 p-2 flex flex-col items-center justify-center text-center text-rose-800">
                              <span className="text-[9px] font-black uppercase tracking-wider">Intervention</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 aspect-[4/3] bg-slate-100 group">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right Column: Title, Author, Description, Action Button */}
                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <h2 
                        onClick={() => setSelectedCourse(course)}
                        className="text-2xl sm:text-3xl font-bold font-display text-[#2563eb] hover:text-[#1d4ed8] transition-colors cursor-pointer leading-snug"
                      >
                        {course.title}
                      </h2>
                      <span className="text-xs font-semibold text-slate-500 block mt-1">
                        {course.author}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {course.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedCourse(course)}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-md transition-all scale-105 active:scale-95"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        Start Free Course
                      </button>
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        {course.duration}
                      </span>
                    </div>
                  </div>

                </article>

                {/* Blue Horizontal Divider matching Screenshot 1 */}
                {idx < courses.length - 1 && (
                  <div className="w-full h-[2px] bg-[#93c5fd]/50 rounded-full my-8"></div>
                )}

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* COURSE ENROLMENT / VIEWER MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
            <div className="bg-gradient-to-r from-[#114227] to-[#1a5b37] text-white p-6 sm:p-8 relative">
              <button
                type="button"
                onClick={() => {
                  setSelectedCourse(null);
                  setEnrolledSuccess(false);
                }}
                className="absolute top-5 right-5 p-2 text-white/80 hover:text-white bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                E-Learning Module
              </span>
              <h3 className="text-2xl font-bold font-display text-white">
                {selectedCourse.title}
              </h3>
              <p className="text-xs text-emerald-100/80 mt-1 font-light">{selectedCourse.author}</p>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-xs sm:text-sm text-slate-700">
              {!enrolledSuccess ? (
                <>
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 text-base">Course Overview & Syllabus</h4>
                    <p className="text-slate-600 leading-relaxed">{selectedCourse.description}</p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">What You Will Learn:</h5>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Core principles of the 4-quadrant BBM Roadmap framework.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Actionable strategies for local child advocacy and family stabilization.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Servant leadership models for sustainable team and volunteer management.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedCourse(null)}
                      className="px-5 py-3 rounded-full border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnrolledSuccess(true)}
                      className="px-8 py-3 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold shadow-md flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Enroll Now (Free Access)
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#114227]">Enrolment Successful!</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      You now have full instant access to all {selectedCourse.modulesCount} modules in <strong>{selectedCourse.title}</strong>.
                    </p>
                  </div>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        alert("Starting Module 1 video stream...");
                        setSelectedCourse(null);
                        setEnrolledSuccess(false);
                      }}
                      className="px-8 py-3.5 rounded-full bg-[#114227] text-white font-bold shadow-md"
                    >
                      Launch Module 1 Video
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Donate Modal */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        defaultPurpose="E-Learning & Course Materials"
      />
    </div>
  );
}
