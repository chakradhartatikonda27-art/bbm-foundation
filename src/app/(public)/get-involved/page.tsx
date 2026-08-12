"use client";

import { useState, useTransition } from "react";
import { Heart, Users, Handshake, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import Link from "next/link";

export default function GetInvolvedPage() {
  const [activeTab, setActiveTab] = useState<"volunteer" | "partner">("volunteer");
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ success: boolean; error: string | null } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await submitContactForm(null, formData);
      if (result.success) {
        setState({ success: true, error: null });
        form.reset();
      } else {
        setState({ success: false, error: result.error });
      }
    });
  };

  return (
    <div className="bg-brand-bg py-16 sm:py-24 animate-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Join the Cause</span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-primary">
            Empower Communities, Create Progress
          </h1>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            True social impact requires collective movement. Join BBM Foundation as a volunteer, coordinate a corporate partnership, or direct sponsorship towards student classrooms.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => {
                setActiveTab("volunteer");
                setState(null);
              }}
              className={`flex w-full items-start gap-4 p-5 rounded-2xl border transition-all text-left focus:outline-none ${
                activeTab === "volunteer"
                  ? "bg-white border-secondary shadow-md"
                  : "bg-white/60 hover:bg-white border-border-gray"
              }`}
            >
              <Users className={`w-6 h-6 flex-shrink-0 mt-0.5 ${activeTab === "volunteer" ? "text-secondary" : "text-slate-400"}`} />
              <div className="space-y-1">
                <span className="block font-bold text-primary text-base">Volunteer with Us</span>
                <span className="block text-xs text-slate-400 font-light leading-normal">
                  Give your time, skills, or mentoring directly in educational campaigns or health camps.
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab("partner");
                setState(null);
              }}
              className={`flex w-full items-start gap-4 p-5 rounded-2xl border transition-all text-left focus:outline-none ${
                activeTab === "partner"
                  ? "bg-white border-secondary shadow-md"
                  : "bg-white/60 hover:bg-white border-border-gray"
              }`}
            >
              <Handshake className={`w-6 h-6 flex-shrink-0 mt-0.5 ${activeTab === "partner" ? "text-secondary" : "text-slate-400"}`} />
              <div className="space-y-1">
                <span className="block font-bold text-primary text-base">Partner With Us</span>
                <span className="block text-xs text-slate-400 font-light leading-normal">
                  Collaborate as a corporate organization or institution to develop larger CSR social programs.
                </span>
              </div>
            </button>

            {/* Donation Quick Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow-md">
              <h3 className="font-bold text-base text-amber-500">Need Immediate Action?</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Direct financial sponsorship allows us to secure learning materials and start trade workshops immediately.
              </p>
              <Link
                href="/donate"
                className="inline-flex w-full justify-center items-center px-4 py-2.5 rounded-full text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow transition-colors"
              >
                Go to Donation Page
                <Heart className="w-3.5 h-3.5 ml-2 fill-current" />
              </Link>
            </div>
          </div>

          {/* Form Content panel */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-2xl border border-border-gray shadow-sm">
            {state?.success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 mb-6 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="block text-emerald-800 font-bold">Inquiry Sent Successfully!</strong>
                  <p className="font-light text-xs text-emerald-700 mt-1">
                    Thank you for reaching out to BBM Foundation. Our coordination office will review your details and contact you via email shortly.
                  </p>
                </div>
              </div>
            )}

            {state?.error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="block text-rose-800 font-bold">Form Submission Failed</strong>
                  <p className="font-light text-xs text-rose-700 mt-1">{state.error}</p>
                </div>
              </div>
            )}

            {activeTab === "volunteer" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-bold text-primary font-display border-b border-slate-100 pb-3">
                  Volunteer Application Form
                </h2>
                
                {/* Hidden input to map purpose */}
                <input type="hidden" name="purpose" value="VOLUNTEER" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Geeta Patel"
                      className="bg-brand-bg rounded-lg border border-border-gray px-4 py-3 text-sm focus:outline-none focus:border-secondary h-11"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. geeta@example.com"
                      className="bg-brand-bg rounded-lg border border-border-gray px-4 py-3 text-sm focus:outline-none focus:border-secondary h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      className="bg-brand-bg rounded-lg border border-border-gray px-4 py-3 text-sm focus:outline-none focus:border-secondary h-11"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="skills" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Skills / Professional Area
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills-input"
                      placeholder="e.g. Teaching, Design, Coordination"
                      className="bg-brand-bg rounded-lg border border-border-gray px-4 py-3 text-sm focus:outline-none focus:border-secondary h-11"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    How do you want to contribute? (Interests, Availability) *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about yourself, your skills, and how you would like to help the communities we support."
                    className="bg-brand-bg rounded-lg border border-border-gray p-4 text-sm focus:outline-none focus:border-secondary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-primary hover:bg-secondary text-white font-semibold text-sm transition-all shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Submitting Request..." : "Submit Volunteer Inquiry"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-bold text-primary font-display border-b border-slate-100 pb-3">
                  Corporate Partnership Inquiry
                </h2>
                
                {/* Hidden input to map purpose */}
                <input type="hidden" name="purpose" value="PARTNERSHIP" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Alpha Technologies Ltd."
                      className="bg-brand-bg rounded-lg border border-border-gray px-4 py-3 text-sm focus:outline-none focus:border-secondary h-11"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. csr@company.com"
                      className="bg-brand-bg rounded-lg border border-border-gray px-4 py-3 text-sm focus:outline-none focus:border-secondary h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="e.g. +91 22 1234 5678"
                      className="bg-brand-bg rounded-lg border border-border-gray px-4 py-3 text-sm focus:outline-none focus:border-secondary h-11"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="location" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Headquarters Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location-input"
                      placeholder="e.g. Mumbai, India"
                      className="bg-brand-bg rounded-lg border border-border-gray px-4 py-3 text-sm focus:outline-none focus:border-secondary h-11"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Partnership & CSR Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Provide details on the target CSR alignment, program sectors, and collaboration goals you would like to explore."
                    className="bg-brand-bg rounded-lg border border-border-gray p-4 text-sm focus:outline-none focus:border-secondary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-primary hover:bg-secondary text-white font-semibold text-sm transition-all shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Submitting Inquiry..." : "Submit Partnership Request"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
