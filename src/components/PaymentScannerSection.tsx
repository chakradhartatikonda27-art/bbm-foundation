"use client";

import { useState } from "react";
import { QrCode, Copy, Check, ShieldCheck, Heart, Smartphone, Sparkles, CreditCard, Award } from "lucide-react";

export default function PaymentScannerSection() {
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("2500");

  const upiId = "bbmfoundation@upi";
  const accountDetails = {
    bankName: "State Bank of India",
    accountName: "BBM FOUNDATION",
    accountNumber: "4289010054321",
    ifscCode: "SBIN0004562",
    branch: "Main Branch, Hyderabad",
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const presetAmounts = ["500", "1000", "2500", "5000", "10000"];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-emerald-950 via-[#0f2e1b] to-slate-950 text-white relative overflow-hidden" aria-labelledby="payment-scanner-heading">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant & Direct Impact</span>
          </div>

          <h2 id="payment-scanner-heading" className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white">
            Scan & Donate via <span className="text-emerald-400">UPI / QR Code</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Support BBM Foundation's child care and family initiatives instantly. Scan using Google Pay, PhonePe, Paytm, BHIM, or any banking app.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          
          {/* LEFT: QR Code Scanner Display Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-emerald-500/20 max-w-sm w-full relative group transform hover:scale-[1.02] transition-all">
              
              {/* Header Branding in Card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="BBM Foundation"
                    className="h-10 w-auto object-contain rounded"
                  />
                  <div>
                    <h3 className="font-display font-black text-sm text-[#114227] leading-tight">BBM FOUNDATION</h3>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest block">Official UPI Handle</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
              </div>

              {/* QR Code Container */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center relative group-hover:border-emerald-400 transition-colors">
                <div className="relative mx-auto w-52 h-52 bg-white p-3 rounded-xl shadow-inner border border-slate-100 flex items-center justify-center">
                  {/* Generated SVG QR Pattern Representation */}
                  <svg className="w-full h-full text-slate-900 fill-current" viewBox="0 0 200 200">
                    {/* Corner Position Detection Squares */}
                    {/* Top-Left */}
                    <rect x="10" y="10" width="50" height="50" rx="6" fill="#114227" />
                    <rect x="20" y="20" width="30" height="30" rx="3" fill="#ffffff" />
                    <rect x="28" y="28" width="14" height="14" rx="2" fill="#114227" />
                    
                    {/* Top-Right */}
                    <rect x="140" y="10" width="50" height="50" rx="6" fill="#114227" />
                    <rect x="150" y="20" width="30" height="30" rx="3" fill="#ffffff" />
                    <rect x="158" y="28" width="14" height="14" rx="2" fill="#114227" />

                    {/* Bottom-Left */}
                    <rect x="10" y="140" width="50" height="50" rx="6" fill="#114227" />
                    <rect x="20" y="150" width="30" height="30" rx="3" fill="#ffffff" />
                    <rect x="28" y="158" width="14" height="14" rx="2" fill="#114227" />

                    {/* Random Dense QR Matrix Elements */}
                    <rect x="70" y="15" width="12" height="12" fill="#059669" />
                    <rect x="90" y="15" width="12" height="12" fill="#114227" />
                    <rect x="115" y="15" width="12" height="12" fill="#059669" />
                    
                    <rect x="70" y="35" width="12" height="12" fill="#114227" />
                    <rect x="95" y="35" width="18" height="12" fill="#059669" />
                    <rect x="120" y="35" width="10" height="12" fill="#114227" />

                    <rect x="15" y="70" width="12" height="12" fill="#059669" />
                    <rect x="35" y="70" width="12" height="12" fill="#114227" />
                    <rect x="55" y="70" width="12" height="12" fill="#059669" />
                    <rect x="75" y="70" width="20" height="12" fill="#114227" />
                    <rect x="105" y="70" width="12" height="12" fill="#059669" />
                    <rect x="125" y="70" width="12" height="12" fill="#114227" />
                    <rect x="145" y="70" width="18" height="12" fill="#059669" />
                    <rect x="170" y="70" width="12" height="12" fill="#114227" />

                    <rect x="15" y="90" width="25" height="12" fill="#114227" />
                    <rect x="45" y="90" width="12" height="12" fill="#059669" />
                    <rect x="65" y="90" width="12" height="12" fill="#114227" />

                    {/* Center Logo Overlay Icon in QR Code */}
                    <rect x="75" y="75" width="50" height="50" rx="10" fill="#ffffff" stroke="#114227" strokeWidth="3" />
                    <image href="/logo.png" x="80" y="80" width="40" height="40" preserveAspectRatio="xMidYMid meet" />

                    <rect x="135" y="90" width="15" height="12" fill="#114227" />
                    <rect x="155" y="90" width="25" height="12" fill="#059669" />

                    <rect x="15" y="110" width="12" height="12" fill="#059669" />
                    <rect x="35" y="110" width="20" height="12" fill="#114227" />
                    <rect x="145" y="110" width="15" height="12" fill="#114227" />
                    <rect x="165" y="110" width="18" height="12" fill="#059669" />

                    <rect x="70" y="140" width="15" height="12" fill="#059669" />
                    <rect x="90" y="140" width="20" height="12" fill="#114227" />
                    <rect x="115" y="140" width="12" height="12" fill="#059669" />
                    <rect x="135" y="140" width="15" height="12" fill="#114227" />
                    <rect x="155" y="140" width="30" height="12" fill="#059669" />

                    <rect x="70" y="160" width="25" height="12" fill="#114227" />
                    <rect x="100" y="160" width="15" height="12" fill="#059669" />
                    <rect x="120" y="160" width="20" height="12" fill="#114227" />
                    <rect x="145" y="160" width="12" height="12" fill="#059669" />
                    <rect x="165" y="160" width="20" height="12" fill="#114227" />

                    <rect x="70" y="178" width="12" height="12" fill="#059669" />
                    <rect x="90" y="178" width="30" height="12" fill="#114227" />
                    <rect x="130" y="178" width="15" height="12" fill="#059669" />
                    <rect x="155" y="178" width="25" height="12" fill="#114227" />
                  </svg>
                </div>

                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mt-3">
                  Scan to Pay ₹{selectedAmount}
                </span>
              </div>

              {/* Supported UPI Apps Row */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-3 text-slate-400">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">Supports:</span>
                <span className="text-xs font-bold text-[#114227] bg-slate-100 px-2 py-0.5 rounded">GPay</span>
                <span className="text-xs font-bold text-[#114227] bg-slate-100 px-2 py-0.5 rounded">PhonePe</span>
                <span className="text-xs font-bold text-[#114227] bg-slate-100 px-2 py-0.5 rounded">Paytm</span>
                <span className="text-xs font-bold text-[#114227] bg-slate-100 px-2 py-0.5 rounded">BHIM</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Quick Preset Amounts & UPI Copy Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Amount Selector */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-400 fill-current" />
                Select Quick Amount
              </h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border ${
                      selectedAmount === amt
                        ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/30 scale-105"
                        : "bg-white/10 text-slate-200 border-white/10 hover:bg-white/20 hover:border-white/30"
                    }`}
                  >
                    ₹{parseInt(amt).toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            {/* UPI VPA Copy Card */}
            <div className="bg-emerald-900/40 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">
                    Direct UPI VPA ID
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-wider block mt-0.5">
                    {upiId}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyUPI}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white" />
                      <span>Copy UPI ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile Direct Deep-Link Button */}
              <a
                href={`upi://pay?pa=${upiId}&pn=BBM%20Foundation&am=${selectedAmount}&cu=INR`}
                className="w-full py-3.5 px-6 rounded-2xl bg-white text-[#114227] hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 lg:hidden"
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Open UPI App (GPay / PhonePe / Paytm)</span>
              </a>
            </div>

            {/* Direct Bank Account Transfer Dropdown / Fallback */}
            <div className="bg-slate-900/60 rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xs">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Direct Bank Account Details (NEFT / RTGS / IMPS):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Account Name:</span>
                  <span className="font-bold text-white">{accountDetails.accountName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Bank Name:</span>
                  <span className="font-bold text-white">{accountDetails.bankName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Account Number:</span>
                  <span className="font-mono font-bold text-emerald-400">{accountDetails.accountNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">IFSC Code:</span>
                  <span className="font-mono font-bold text-emerald-400">{accountDetails.ifscCode}</span>
                </div>
              </div>
            </div>

            {/* 80G Tax Exemption Verification Banner */}
            <div className="bg-emerald-950/80 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3.5 text-xs text-emerald-200">
              <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white block">80G Tax Exemption Certified</span>
                <span className="text-[11px] text-emerald-300/80">
                  Donations to BBM Foundation are eligible for 80G tax benefit certificate under the Income Tax Act.
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
