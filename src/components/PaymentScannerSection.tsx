"use client";

import { useState } from "react";
import { QrCode, Copy, Check, ShieldCheck, Heart, Smartphone, Sparkles, CreditCard, Award } from "lucide-react";

interface PaymentScannerSectionProps {
  scannerData?: {
    upiId?: string;
    accountName?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    taxNote?: string;
  };
}

export default function PaymentScannerSection({ scannerData }: PaymentScannerSectionProps) {
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("2500");

  const upiId = scannerData?.upiId || "QR919885126368-0750@unionbankofindia";
  const accountDetails = {
    bankName: scannerData?.bankName || "Union Bank of India",
    accountName: scannerData?.accountName || "BBM FOUNDATION",
    accountNumber: scannerData?.accountNumber || "551401010050750",
    ifscCode: scannerData?.ifscCode || "UBIN0555142",
    branch: "Narsipatnam Branch",
    taxNote: scannerData?.taxNote || "Donations to BBM Foundation are eligible for 80G tax benefit certificate under the Income Tax Act.",
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
            Support BBM Foundation's initiatives instantly. Scan using Google Pay, PhonePe, Paytm, BHIM, or any UPI banking app.
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
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest block">Union Bank of India Official QR</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
              </div>

              {/* Official Union Bank QR Code Image Container */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center relative group-hover:border-emerald-400 transition-colors">
                <div className="relative mx-auto w-56 h-auto bg-white p-2 rounded-xl shadow-md border border-slate-100 flex items-center justify-center overflow-hidden">
                  <img
                    src="/union_bank_qr.png"
                    alt="Union Bank BBM Foundation Official UPI QR Code"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>

                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest block mt-3">
                  Scan to Pay ₹{selectedAmount}
                </span>
                <span className="text-[10px] font-mono text-emerald-800 font-bold block mt-0.5">
                  {upiId}
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
                    Direct Official UPI VPA ID
                  </span>
                  <span className="text-sm sm:text-base font-mono font-black text-white tracking-wider block mt-0.5 break-all">
                    {upiId}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyUPI}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 flex-shrink-0"
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
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Branch:</span>
                  <span className="font-bold text-white">{accountDetails.branch}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">PAN Number:</span>
                  <span className="font-mono font-bold text-emerald-400">AAFTB3316H</span>
                </div>
              </div>
            </div>

            {/* 80G Tax Exemption Verification Banner */}
            <div className="bg-emerald-950/80 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3.5 text-xs text-emerald-200">
              <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white block">80G Tax Exemption Certified</span>
                <span className="text-[11px] text-emerald-300/80">
                  {accountDetails.taxNote}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
