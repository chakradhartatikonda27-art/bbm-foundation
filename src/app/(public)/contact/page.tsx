"use client";

import { useState, useTransition } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactPage() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ success: boolean; error: string | null } | null>(null);

  // Custom client-side validation states
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null);
    }
  };

  const handleEmailInput = () => {
    if (emailError) setEmailError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(null);
    
    if (emailError) return;

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
        
        {/* Title */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Contact Us</span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-primary">
            Connect With Our Office
          </h1>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            Have questions about our programs, audit reports, or want to coordinate support? Get in touch with our coordination team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-primary text-white p-8 rounded-2xl shadow-md space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-800 rounded-full -mr-12 -mt-12 -z-10"></div>
              <h2 className="text-xl font-bold font-display text-white">Foundation Headquarters</h2>
              
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Mailing Address:</strong>
                    <span className="font-light block mt-1">[VERIFIED DATA REQUIRED]</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Telephone Support:</strong>
                    <span className="font-light block mt-1">[VERIFIED DATA REQUIRED]</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Email Address:</strong>
                    <a href="mailto:info@bbmfoundation.org" className="font-light block mt-1 hover:text-white transition-colors">
                      info@bbmfoundation.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Google Map Container */}
            <div className="bg-white border border-border-gray rounded-2xl p-4 shadow-sm space-y-3">
              <strong className="text-xs uppercase tracking-wider text-slate-400 block">Office Location Map</strong>
              <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200/60 relative overflow-hidden">
                <div className="text-center p-4 space-y-1">
                  <MapPin className="w-8 h-8 text-slate-300 mx-auto" />
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Interactive Map Blocked</span>
                  <span className="text-[9px] text-slate-400 font-light block leading-normal">
                    Requires verified latitude/longitude coordinates to mount map API.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-border-gray shadow-sm">
            {state?.success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 mb-6 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="block text-emerald-800 font-bold">Message Sent Successfully!</strong>
                  <p className="font-light text-xs text-emerald-700 mt-1">
                    Thank you. We have received your inquiry. Our support representative will contact you via email shortly.
                  </p>
                </div>
              </div>
            )}

            {state?.error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="block text-rose-800 font-bold">Failed to Send Message</strong>
                  <p className="font-light text-xs text-rose-700 mt-1">{state.error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-bold text-primary font-display border-b border-slate-100 pb-3">
                Send a Message
              </h2>

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
                    onBlur={handleEmailBlur}
                    onInput={handleEmailInput}
                    placeholder="e.g. geeta@example.com"
                    className={`bg-brand-bg rounded-lg border px-4 py-3 text-sm focus:outline-none h-11 ${
                      emailError ? "border-rose-400 focus:border-rose-400" : "border-border-gray focus:border-secondary"
                    }`}
                  />
                  {emailError && <span className="text-[10px] text-rose-500 mt-0.5">{emailError}</span>}
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
                  <label htmlFor="purpose" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Purpose of Message *
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    required
                    className="bg-brand-bg rounded-lg border border-border-gray px-4 py-3 text-sm focus:outline-none focus:border-secondary h-11 appearance-none"
                  >
                    <option value="OTHER">General Support Inquiry</option>
                    <option value="DONATION">Donation & Receipt Support</option>
                    <option value="VOLUNTEER">Volunteer Program Interest</option>
                    <option value="PARTNERSHIP">Corporate CSR Partnerships</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Detailed Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Enter details of your query..."
                  className="bg-brand-bg rounded-lg border border-border-gray p-4 text-sm focus:outline-none focus:border-secondary"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isPending || !!emailError}
                className="inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-primary hover:bg-secondary text-white font-semibold text-sm transition-all shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Sending Message..." : "Send Message"}
                <Send className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
