"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Globe, Users, CheckCircle, ArrowRight, MapPin, Heart, Share2, X, Check } from "lucide-react";
import DonateModal from "./DonateModal";

interface Speaker {
  name: string;
  role: string;
  imageUrl: string;
}

export default function EventsClient() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState("Local Leader");

  const speakers: Speaker[] = [
    {
      name: "Karmen Friesen",
      role: "WWO Principal Coordinator",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
    },
    {
      name: "Faby Ruesga",
      role: "Regional Ambassador, East Asia",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
    },
    {
      name: "Praveen Gomez",
      role: "Implementation Lead",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    },
    {
      name: "Shamindra Fernando",
      role: "Coordinator, Sri Lanka Without Orphans & South Asia",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    },
    {
      name: "Malla Reddy",
      role: "BBM Foundation Chairman & Managing Trustee",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
    },
    {
      name: "MV Prasad",
      role: "Trustee - Governance & Community Outreach",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400",
    },
    {
      name: "Dr. Rachel Stevens",
      role: "Child Protection & Foster Care Specialist",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
    },
    {
      name: "Elena Popa",
      role: "Regional Coordinator, Eastern Europe Camps",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
    },
  ];

  const upcomingEvents = [
    {
      title: "Global Connections, Local Action Community Gathering 2026",
      date: "FRIDAY, 17 JULY 2026",
      type: "Hybrid Global Summit",
      location: "Online & Regional Local Hubs",
    },
    {
      title: "Annual Refresh Camp & Foster Family Rest Retreat",
      date: "15 - 22 AUGUST 2026",
      type: "In-Person Camp",
      location: "Camp Center & Regional Outposts",
    },
    {
      title: "South Asia Child Rights & Family Reunification Forum",
      date: "10 SEPTEMBER 2026",
      type: "Regional Workshop",
      location: "Hyderabad & Virtual Stream",
    },
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) return;
    setRegisterSuccess(true);
  };

  return (
    <div className="flex flex-col w-full bg-white animate-fade-up">
      {/* 1. HERO HEADER (Matching Screenshot 1: WWO Community Gatherings 2026) */}
      <section 
        className="relative min-h-[35vh] sm:min-h-[40vh] -mt-20 pt-32 pb-16 flex items-center justify-center text-white bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(15, 30, 20, 0.65), rgba(15, 30, 20, 0.8)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1920')"
        }}
        aria-label="Events Hero Header"
      >
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white drop-shadow-md uppercase">
            BBM Community Gatherings 2026
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 font-light max-w-2xl mx-auto">
            Connecting global vision with local community action for children and families.
          </p>
        </div>
      </section>

      {/* 2. MAIN FEATURED EVENT CONTAINER (Matching Screenshot 1 Layout: Soft mint container bg-[#edf4f0]) */}
      <section className="py-16 sm:py-24 bg-[#f4f8f5]" aria-labelledby="featured-event-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#e9f2eb] rounded-[2.5rem] p-8 sm:p-12 border border-emerald-900/10 shadow-sm space-y-10">
            
            {/* Header Title & Date */}
            <div className="text-center space-y-3">
              <h2 id="featured-event-heading" className="text-3xl sm:text-4xl font-display font-extrabold text-[#114227]">
                Global Connections, Local Action
              </h2>
              <div className="inline-block bg-emerald-700 text-white text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-sm">
                FRIDAY, 17 JULY 2026
              </div>
            </div>

            {/* Split Content: Left details + Right Poster Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Left Column: Text & Bullet Lists matching Screenshot 1 */}
              <div className="lg:col-span-7 space-y-8 text-slate-800">
                <p className="text-sm sm:text-base leading-relaxed font-medium">
                  <strong>“Global Connections, Local Action” was a unique opportunity for leaders in Europe, Africa, MENA and Asia</strong> to connect online with the global community while gathering in person locally with friends, colleagues, and partners who share a heart for children and families. Leaders invited others to join them and grew their local network with a vision for vulnerable children.
                </p>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    This year's hybrid gathering allowed participants to:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                      <span>Connect with the worldwide community</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                      <span>Gather locally with partners in their area</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                      <span>Learn from inspiring stories of impact across nations</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                      <span>Reflect and identify practical next steps for their local context</span>
                    </li>
                  </ul>
                </div>

                {/* Section 2: Calling All Local and National Leaders */}
                <div className="space-y-4 pt-4 border-t border-emerald-900/10">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#114227]">
                    Calling All Local and National Leaders
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Are you passionate about working together to:
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 flex-shrink-0"></span>
                      <span>Strengthen families to prevent orphanhood and child vulnerability?</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 flex-shrink-0"></span>
                      <span>Provide families for orphaned children through reunification, foster care, or adoption?</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 flex-shrink-0"></span>
                      <span>Build partnerships to help children and families thrive?</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 flex-shrink-0"></span>
                      <span>Promote self-care and spiritual renewal for those serving?</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(true)}
                    className="px-8 py-3.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm shadow-md transition-all scale-105 active:scale-95"
                  >
                    Register for Next Gathering
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDonateOpen(true)}
                    className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    Sponsor Event Logistics
                  </button>
                </div>
              </div>

              {/* Right Column: Poster Card matching Screenshot 1 */}
              <div className="lg:col-span-5">
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-white/60 bg-gradient-to-b from-[#114227] to-[#1a5b37] text-white p-6 sm:p-8 space-y-6">
                  
                  <div className="text-center space-y-2 border-b border-white/10 pb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Official Gathering Poster</span>
                    <h4 className="text-2xl font-black font-display tracking-tight text-white uppercase leading-tight">
                      GLOBAL CONNECTIONS.<br />LOCAL ACTION.
                    </h4>
                    <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">
                      BBM Foundation Community Gatherings 2026
                    </p>
                  </div>

                  {/* Date badge card inside poster */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Friday, July 17, 2026</span>
                    </div>

                    {/* Timezone schedule table matching Screenshot 1 poster */}
                    <div className="space-y-2 text-xs font-mono text-emerald-100/90 border-t border-white/10 pt-3">
                      <div className="flex justify-between">
                        <span>South Africa</span>
                        <span className="font-bold text-white">09:00 to 12:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Jordan</span>
                        <span className="font-bold text-white">10:00 to 13:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>India (IST)</span>
                        <span className="font-bold text-emerald-300">12:30 to 15:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Singapore</span>
                        <span className="font-bold text-white">15:00 to 18:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden h-44 shadow-md border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600"
                      alt="Gathering poster mountain silhouette"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. SPEAKERS GRID SECTION (Matching Screenshot 2: "Participants heard from these people") */}
      <section className="py-20 sm:py-28 bg-white" aria-labelledby="speakers-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 id="speakers-heading" className="text-3xl sm:text-4xl font-display font-bold text-[#114227]">
              Participants heard from these people
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Global and regional leaders sharing real-world insights, field data, and child protection frameworks.
            </p>
          </div>

          {/* Speaker Cards Grid matching Screenshot 2 (Circular portraits, blue text name, grey role text) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {speakers.map((sp, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
                
                {/* Circular Portrait Image */}
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg border-4 border-white ring-4 ring-slate-100 group-hover:scale-105 group-hover:ring-[#2563eb]/40 transition-all duration-300">
                  <img
                    src={sp.imageUrl}
                    alt={sp.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Name & Role text */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-display text-[#2563eb] group-hover:text-[#1d4ed8] transition-colors">
                    {sp.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium max-w-[200px] leading-relaxed">
                    {sp.role}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. UPCOMING EVENTS LIST */}
      <section className="py-20 bg-[#f4f8f5] border-t border-slate-200" aria-labelledby="all-events-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">Schedule</span>
            <h2 id="all-events-heading" className="text-3xl font-display font-bold text-[#114227]">
              Upcoming Foundation Gatherings & Forums
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {ev.type}
                  </span>
                  <h3 className="text-lg font-bold font-display text-slate-900 leading-tight">
                    {ev.title}
                  </h3>
                  <div className="space-y-2 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#2563eb]" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(true)}
                  className="w-full py-3 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-sm transition-all"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* EVENT REGISTRATION MODAL */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => {
                setIsRegisterOpen(false);
                setRegisterSuccess(false);
              }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {!registerSuccess ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display text-[#114227]">Register for Gathering</h3>
                  <p className="text-xs text-slate-500">Global Connections, Local Action — July 17, 2026</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Dr. Anil Kumar"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. anil@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Your Role / Organization</label>
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Local Leader">Local Leader / Educator</option>
                      <option value="Foster Parent / Advocate">Foster Parent / Advocate</option>
                      <option value="NGO Partner">NGO / Foundation Partner</option>
                      <option value="Volunteer">Community Volunteer</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-md transition-all"
                >
                  Confirm Registration
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#114227]">Registration Confirmed!</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Thank you {regName}. An event access code and calendar invite have been sent to <strong>{regEmail}</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setRegisterSuccess(false);
                    setRegName("");
                    setRegEmail("");
                  }}
                  className="w-full py-3 rounded-full bg-[#114227] text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Donate Modal */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        defaultPurpose="Event & Gathering Logistics"
      />
    </div>
  );
}
