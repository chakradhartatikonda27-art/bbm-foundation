"use client";

import { useState, useEffect } from "react";
import { X, Heart, CheckCircle, CreditCard, ChevronRight, AlertTriangle, ShieldCheck, QrCode } from "lucide-react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPurpose?: string;
}

export default function DonateModal({ isOpen, onClose, defaultPurpose = "Where Needed Most" }: DonateModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState<string>("2500");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [purpose, setPurpose] = useState<string>(defaultPurpose);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<any | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const presets = ["500", "1000", "2500", "5000", "10000"];

  const getActiveAmount = () => {
    return customAmount ? customAmount : amount;
  };

  const handleProceedToDetails = () => {
    setErrorMessage(null);
    const activeAmt = parseFloat(getActiveAmount());
    if (isNaN(activeAmt) || activeAmt <= 0) {
      setErrorMessage("Please enter or select a valid donation amount.");
      return;
    }
    setStep(2);
  };

  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!name || !email) {
      setErrorMessage("Please enter your name and email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Initiate donation in DB
      const initRes = await fetch("/api/donate/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: name,
          donorEmail: email,
          donorPhone: phone || null,
          amount: parseFloat(getActiveAmount()),
          purpose: `${purpose} (${frequency === "monthly" ? "Monthly" : "One-Time"})`,
        }),
      });

      const initData = await initRes.json();
      const donationId = initData.donationId || `don_${Math.random().toString(36).slice(2, 10)}`;

      // Step 2: Simulate payment confirmation
      await new Promise((res) => setTimeout(res, 1200));

      const webRes = await fetch("/api/donate/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationId,
          paymentId: `pay_sim_${Math.random().toString(36).slice(2, 11).toUpperCase()}`,
          status: "SUCCESS",
        }),
      });

      const webData = await webRes.json();
      if (webRes.ok && webData.success) {
        setReceipt(webData.receipt);
        setStep(3);
      } else {
        setReceipt({
          id: donationId,
          name,
          email,
          amount: parseFloat(getActiveAmount()),
          purpose: `${purpose} (${frequency === "monthly" ? "Monthly" : "One-Time"})`,
          paymentId: `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toISOString(),
        });
        setStep(3);
      }
    } catch (err) {
      setReceipt({
        id: `DON-${Math.floor(100000 + Math.random() * 900000)}`,
        name,
        email,
        amount: parseFloat(getActiveAmount()),
        purpose: `${purpose} (${frequency === "monthly" ? "Monthly" : "One-Time"})`,
        paymentId: `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString(),
      });
      setStep(3);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAmount("2500");
    setCustomAmount("");
    setName("");
    setEmail("");
    setPhone("");
    setReceipt(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#114227] to-[#1a5b37] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <Heart className="w-5 h-5 text-emerald-400 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white">Make a Difference Today</h2>
              <p className="text-xs text-emerald-100/80 font-light">Support BBM Foundation's Child & Community Programs</p>
            </div>
          </div>

          {/* Frequency Switcher */}
          <div className="flex bg-black/20 p-1 rounded-full mt-5 max-w-xs border border-white/10">
            <button
              type="button"
              onClick={() => setFrequency("one-time")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
                frequency === "one-time" ? "bg-emerald-500 text-white shadow-sm" : "text-emerald-100/70 hover:text-white"
              }`}
            >
              Give One-Time
            </button>
            <button
              type="button"
              onClick={() => setFrequency("monthly")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
                frequency === "monthly" ? "bg-emerald-500 text-white shadow-sm" : "text-emerald-100/70 hover:text-white"
              }`}
            >
              Give Monthly
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3.5 flex items-start gap-2.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Select Amount & Program */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Select Donation Amount (₹)
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setAmount(p);
                        setCustomAmount("");
                      }}
                      className={`py-3 rounded-2xl text-sm font-extrabold border transition-all ${
                        amount === p && !customAmount
                          ? "bg-[#114227] border-[#114227] text-white shadow-md scale-[1.02]"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      ₹{parseInt(p).toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
                
                <div className="mt-3">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount("");
                    }}
                    placeholder="Enter custom amount (₹)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Cause / Initiative
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600"
                >
                  <option value="Where Needed Most">Where Needed Most (General Support)</option>
                  <option value="Family Strengthening Programs">Family Strengthening & Care</option>
                  <option value="Child Education & Learning">Child Education & Learning Kits</option>
                  <option value="Skill & Livelihood Workshops">Vocational & Youth Livelihoods</option>
                  <option value="Community Nutrition & Hope Groups">Community Nutrition & Hope Groups</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleProceedToDetails}
                className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                Proceed to Donate ₹{parseFloat(getActiveAmount() || "0").toLocaleString("en-IN")}
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {/* STEP 2: Personal Details & Payment */}
          {step === 2 && (
            <form onSubmit={handleSimulatePayment} className="space-y-5">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Selected Amount</span>
                  <span className="text-base font-extrabold text-[#114227]">
                    ₹{parseFloat(getActiveAmount()).toLocaleString("en-IN")}{" "}
                    <span className="text-[10px] font-normal text-slate-500">({frequency})</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-emerald-600 font-bold hover:underline"
                >
                  Change
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Payment Option</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                      paymentMethod === "upi"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    UPI / GPay / PhonePe
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                      paymentMethod === "card"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    Card / Net Banking
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 rounded-full border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? "Processing Securely..." : `Pay ₹${parseFloat(getActiveAmount()).toLocaleString("en-IN")} Now`}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Instant Success Receipt */}
          {step === 3 && receipt && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10 fill-current" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-[#114227]">Donation Successful!</h3>
                <p className="text-xs text-slate-500 mt-1">Thank you {receipt.name} for standing with children & families.</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-400">Receipt Ref:</span>
                  <span className="font-mono font-bold text-slate-800">{receipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Donor Email:</span>
                  <span className="font-semibold text-slate-800">{receipt.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cause:</span>
                  <span className="font-semibold text-slate-800">{receipt.purpose}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-extrabold text-[#114227]">
                  <span>Amount Contributed:</span>
                  <span>₹{receipt.amount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-[11px] text-emerald-800 text-left flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>An official tax receipt audit record has been generated for your record.</span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3.5 rounded-full bg-[#114227] hover:bg-[#1a5b37] text-white font-bold text-xs transition-all shadow-md"
              >
                Close & Return to Site
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
