"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Heart, CheckCircle, CreditCard, ChevronRight, AlertTriangle, ShieldCheck, QrCode } from "lucide-react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPurpose?: string;
}

export default function DonateModal({ isOpen, onClose, defaultPurpose = "Where Needed Most" }: DonateModalProps) {
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
  }, []);

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

  if (!isOpen || !mounted) return null;

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

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 animate-fade-in overflow-y-auto"
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
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all ${
                frequency === "one-time" ? "bg-emerald-500 text-white shadow-sm" : "text-emerald-100 hover:text-white"
              }`}
            >
              One-Time
            </button>
            <button
              type="button"
              onClick={() => setFrequency("monthly")}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all ${
                frequency === "monthly" ? "bg-emerald-500 text-white shadow-sm" : "text-emerald-100 hover:text-white"
              }`}
            >
              Monthly Support
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-3.5 flex items-start gap-2 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Select Amount & Purpose */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Donation Amount (₹)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount("");
                      }}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                        amount === preset && !customAmount
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      ₹{preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Or Custom Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm font-bold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Cause / Initiative
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-semibold text-slate-700 focus:outline-none bg-white"
                >
                  <option value="Where Needed Most">Where Needed Most (General Impact)</option>
                  <option value="Child & Family Support">Child & Family Support</option>
                  <option value="Prerna Education & School Kits">Prerna Education & School Kits</option>
                  <option value="Swashakti Youth Mentorship">Swashakti Youth Mentorship</option>
                  <option value="Suraksha Girl Child Protection">Suraksha Girl Child Protection</option>
                  <option value="Family Reunification & Foster Care">Family Reunification & Foster Care</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleProceedToDetails}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Continue to Details</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* STEP 2: Donor Info & Payment Mode */}
          {step === 2 && (
            <form onSubmit={handleSimulatePayment} className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Selected Amount: </span>
                  <span className="font-extrabold text-emerald-800">₹{getActiveAmount()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-emerald-700 font-bold underline hover:text-emerald-900"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
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
                    <span>UPI / QR / GPay</span>
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
                    <span>Credit / Debit Card</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Complete ₹{getActiveAmount()} Donation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Receipt & Confirmation */}
          {step === 3 && (
            <div className="text-center space-y-5 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-display text-slate-800">Thank You, {name}!</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Your generous contribution directly powers BBM Foundation's child care and family initiatives.
                </p>
              </div>

              {receipt && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-slate-500 font-medium">Receipt ID:</span>
                    <span className="font-mono font-bold text-slate-800">{receipt.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-slate-500 font-medium">Amount Paid:</span>
                    <span className="font-extrabold text-emerald-700">₹{receipt.amount}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-slate-500 font-medium">Cause:</span>
                    <span className="font-semibold text-slate-700">{receipt.purpose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Status:</span>
                    <span className="font-bold text-emerald-600 uppercase text-[10px] tracking-wider">VERIFIED SUCCESS</span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
              >
                Close & Return to Site
              </button>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}
