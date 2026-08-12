"use client";

import { useState } from "react";
import { Heart, CheckCircle, CreditCard, ChevronRight, ChevronLeft, Calendar, FileText, Printer, AlertTriangle, ShieldCheck } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;

interface Receipt {
  id: string;
  name: string;
  email: string;
  amount: number;
  purpose: string;
  paymentId: string;
  date: string;
}

export default function DonatePage() {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState<string>("2500");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("Where Needed Most");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Transaction states
  const [donationId, setDonationId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const presets = ["500", "1000", "2500", "5000", "10000"];

  const getActiveAmount = () => {
    return customAmount ? customAmount : amount;
  };

  const handleNextStep = () => {
    setErrorMessage(null);
    if (step === 1) {
      const activeAmt = parseFloat(getActiveAmount());
      if (isNaN(activeAmt) || activeAmt <= 0) {
        setErrorMessage("Please enter or select a valid donation amount.");
        return;
      }
    }
    if (step === 3) {
      if (!name || !email) {
        setErrorMessage("Please fill in your Name and Email address.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
      // Initiate donation in DB
      initiateDonation();
      return;
    }
    setStep((s) => (s + 1) as Step);
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    setStep((s) => (s - 1) as Step);
  };

  const initiateDonation = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/donate/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: name,
          donorEmail: email,
          donorPhone: phone || null,
          amount: parseFloat(getActiveAmount()),
          purpose,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDonationId(data.donationId);
        setStep(4);
      } else {
        setErrorMessage(data.error || "Failed to initialize checkout.");
      }
    } catch (e) {
      setErrorMessage("Network error occurred during checkout setup.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    // Simulate payment latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Simulate webhook processor calling backend verification
      const res = await fetch("/api/donate/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationId,
          paymentId: `pay_sim_${Math.random().toString(36).slice(2, 11).toUpperCase()}`,
          status: "SUCCESS",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReceipt(data.receipt);
        setStep(5);
      } else {
        setErrorMessage(data.error || "Payment verification failed.");
      }
    } catch (e) {
      setErrorMessage("Network connection lost during verification.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-brand-bg py-16 sm:py-24 animate-fade-up print:py-0 print:bg-white flex-grow flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6 print:px-0">
        
        {/* Step Indicator */}
        {step < 5 && (
          <nav aria-label="Donation Progress" className="mb-8 print:hidden">
            <ol className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <li className={step >= 1 ? "text-secondary font-bold" : ""}>1. Amount</li>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <li className={step >= 2 ? "text-secondary font-bold" : ""}>2. Purpose</li>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <li className={step >= 3 ? "text-secondary font-bold" : ""}>3. Details</li>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <li className={step >= 4 ? "text-secondary font-bold" : ""}>4. Pay</li>
            </ol>
          </nav>
        )}

        {/* Card Shell */}
        <div className="bg-white rounded-3xl border border-border-gray shadow-md overflow-hidden print:border-0 print:shadow-none">
          
          {/* Header block */}
          {step < 5 && (
            <div className="bg-primary text-white p-6 sm:p-8 text-center space-y-2">
              <Heart className="w-8 h-8 text-amber-500 mx-auto fill-current animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold font-display">Support Our Initiatives</h1>
              <p className="text-xs text-slate-400 font-light">
                Securely coordinate your contribution to fund educational resources and trade workshops.
              </p>
            </div>
          )}

          {/* Form Area */}
          <div className="p-6 sm:p-10 space-y-6">
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl p-4 flex items-start gap-3 text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: Amount */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-base font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-2">
                  Choose Donation Amount
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setAmount(p);
                        setCustomAmount("");
                      }}
                      className={`py-3.5 rounded-2xl text-sm font-bold border transition-all ${
                        amount === p && !customAmount
                          ? "bg-primary border-primary text-white"
                          : "bg-brand-bg border-border-gray text-primary hover:bg-slate-50"
                      }`}
                    >
                      ₹{parseInt(p).toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="custom-amount" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Or Enter Custom Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="custom-amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount("");
                    }}
                    placeholder="Enter custom amount"
                    className="bg-brand-bg rounded-xl border border-border-gray px-4 py-3.5 text-sm focus:outline-none focus:border-secondary h-12 font-bold"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Purpose */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-2">
                  Map Your Contribution
                </h2>
                
                {[
                  "Where Needed Most",
                  "Education Support Program",
                  "Employability & Skill Development",
                  "Women & Family Empowerment",
                  "Health & Wellbeing Campaigns",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPurpose(item)}
                    className={`flex items-center justify-between w-full p-4 rounded-xl border text-left transition-all ${
                      purpose === item
                        ? "bg-primary border-primary text-white"
                        : "bg-brand-bg border-border-gray text-primary hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-semibold">{item}</span>
                    <ChevronRight className={`w-4 h-4 ${purpose === item ? "text-amber-500" : "text-slate-400"}`} />
                  </button>
                ))}
              </div>
            )}

            {/* STEP 3: Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-base font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-2">
                  Donor Personal Details
                </h2>

                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="donor-name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="donor-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Geeta Patel"
                    className="bg-brand-bg rounded-xl border border-border-gray px-4 py-3.5 text-sm focus:outline-none focus:border-secondary h-12"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="donor-email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="donor-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="e.g. geeta@example.com"
                    className="bg-brand-bg rounded-xl border border-border-gray px-4 py-3.5 text-sm focus:outline-none focus:border-secondary h-12"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="donor-phone" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="donor-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="bg-brand-bg rounded-xl border border-border-gray px-4 py-3.5 text-sm focus:outline-none focus:border-secondary h-12"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Checkout Sandbox Simulation */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-base font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-2">
                  Secure Checkout Simulation
                </h2>

                <div className="bg-slate-50 p-5 rounded-2xl border border-border-gray space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Donor Name:</span>
                    <span className="font-bold text-primary">{name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Purpose Mapping:</span>
                    <span className="font-bold text-primary">{purpose}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-slate-200/60 pt-3">
                    <span className="text-slate-400">Amount Due:</span>
                    <span className="text-lg font-extrabold text-primary">
                      ₹{parseFloat(getActiveAmount()).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Choose Payment Channel
                  </span>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-secondary/60 bg-amber-500/5">
                      <CreditCard className="w-5 h-5 text-secondary" />
                      <div className="text-xs">
                        <strong className="block text-primary">Simulated Secure Payment Gateway</strong>
                        <span className="block text-slate-400 mt-0.5">Triggers direct checkout validation callback.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="inline-flex justify-center items-center w-full py-4 rounded-full bg-secondary hover:bg-secondary-hover text-white font-bold text-sm shadow-md transition-colors disabled:opacity-50"
                >
                  {isProcessing
                    ? "Verifying Transaction..."
                    : `Simulate Payment of ₹${parseFloat(getActiveAmount()).toLocaleString("en-IN")}`}
                </button>
              </div>
            )}

            {/* STEP 5: Success Receipt */}
            {step === 5 && receipt && (
              <div className="space-y-6 animate-fade-up">
                {/* Print Banner */}
                <div className="text-center space-y-2 print:hidden">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto fill-current" />
                  <h1 className="text-2xl font-bold font-display text-primary">Thank You For Your Support!</h1>
                  <p className="text-xs text-slate-500 font-light max-w-sm mx-auto">
                    Your simulated payment was processed successfully. A downloadable copy of your record is compiled below.
                  </p>
                </div>

                {/* Receipt Box */}
                <div className="border border-border-gray rounded-2xl p-6 sm:p-8 space-y-6 bg-slate-50/50 print:border-0 print:p-0">
                  <div className="border-b border-border-gray pb-4 flex justify-between items-center">
                    <div>
                      <h2 className="font-display font-extrabold text-lg text-primary">BBM FOUNDATION</h2>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold block">Donation Receipt Record</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Transaction ID</span>
                      <span className="text-xs font-mono font-bold text-primary block">{receipt.id.slice(0, 13)}...</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="block text-slate-400">Donor Name:</span>
                      <span className="block font-bold text-primary mt-0.5">{receipt.name}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Donor Email:</span>
                      <span className="block font-bold text-primary mt-0.5">{receipt.email}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Sector Mapping:</span>
                      <span className="block font-bold text-primary mt-0.5">{receipt.purpose}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Date:</span>
                      <span className="block font-bold text-primary mt-0.5">
                        {new Date(receipt.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border-gray pt-4 flex justify-between items-center">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase">Payment Reference</span>
                      <span className="block font-mono text-xs font-bold text-primary mt-0.5">{receipt.paymentId}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase">Amount Received</span>
                      <span className="block text-base font-extrabold text-primary mt-0.5">
                        ₹{receipt.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Compliance Caveat */}
                  <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 rounded-xl p-4 flex items-start gap-2.5 text-[10px] leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Transparency Notice:</strong> BBM Foundation is currently undergoing formal regulatory vetting. Section 80G tax exemption claims and statutory receipts are pending trustee certification. This receipt represents a valid transaction audit record.
                    </div>
                  </div>
                </div>

                {/* Print Control */}
                <div className="flex gap-4 print:hidden">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex-grow inline-flex justify-center items-center px-5 py-3 rounded-full bg-primary hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Receipt
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setAmount("2500");
                      setCustomAmount("");
                      setName("");
                      setEmail("");
                      setPhone("");
                      setReceipt(null);
                    }}
                    className="inline-flex justify-center items-center px-5 py-3 rounded-full border border-border-gray hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors"
                  >
                    Support Again
                  </button>
                </div>
              </div>
            )}

            {/* Nav controls */}
            {step > 1 && step < 5 && (
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 print:hidden">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isProcessing}
                  className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-primary transition-colors focus:outline-none"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
                
                {step < 4 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isProcessing}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold bg-primary hover:bg-slate-800 text-white transition-colors focus:outline-none"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            )}
            
            {step === 1 && (
              <div className="pt-4 border-t border-slate-100 flex justify-end print:hidden">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold bg-primary hover:bg-slate-800 text-white transition-colors focus:outline-none"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
