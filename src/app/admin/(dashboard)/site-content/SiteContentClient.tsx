"use client";

import { useState } from "react";
import { Save, CheckCircle, QrCode, FileText, Sparkles, Building, Phone, Mail } from "lucide-react";

interface SiteContentClientProps {
  initialContent: Record<string, any>;
}

export default function SiteContentClient({ initialContent }: SiteContentClientProps) {
  const [activeTab, setActiveTab] = useState<"hero" | "scanner" | "contact">("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Hero section form
  const [heroTitle, setHeroTitle] = useState(
    initialContent?.hero?.title || "YOU CAN PLAY A VITAL ROLE IN ATTAINING A WORLD WITHOUT ORPHANS"
  );
  const [heroHighlight, setHeroHighlight] = useState(initialContent?.hero?.highlight || "VITAL");
  const [heroSubtitle, setHeroSubtitle] = useState(
    initialContent?.hero?.subtitle || "Everything we do together multiplies, so with your participation, millions of children can grow up in strong families and know their identity with a loving future."
  );
  const [heroImage, setHeroImage] = useState(
    initialContent?.hero?.backgroundImage || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920"
  );

  // Payment Scanner form
  const [upiId, setUpiId] = useState(initialContent?.scanner?.upiId || "bbmfoundation@upi");
  const [accountName, setAccountName] = useState(initialContent?.scanner?.accountName || "BBM FOUNDATION");
  const [bankName, setBankName] = useState(initialContent?.scanner?.bankName || "State Bank of India");
  const [accountNumber, setAccountNumber] = useState(initialContent?.scanner?.accountNumber || "4289010054321");
  const [ifscCode, setIfscCode] = useState(initialContent?.scanner?.ifscCode || "SBIN0004562");
  const [taxNote, setTaxNote] = useState(
    initialContent?.scanner?.taxNote || "Donations to BBM Foundation are eligible for 80G tax benefit certificate under the Income Tax Act."
  );

  // Contact Info form
  const [contactEmail, setContactEmail] = useState(initialContent?.contact?.email || "info@bbmfoundation.org");
  const [contactPhone, setContactPhone] = useState(initialContent?.contact?.phone || "+91 98765 43210");
  const [contactAddress, setContactAddress] = useState(
    initialContent?.contact?.address || "BBM Foundation Secretariat, Jubilee Hills, Hyderabad, Telangana 500033"
  );

  const handleSave = async (key: string, payload: any) => {
    setIsSaving(true);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, payload }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Successfully updated ${key.replace("_", " ")} settings!`);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.error || "Failed to update site content");
      }
    } catch {
      alert("Network error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black font-display text-white tracking-tight flex items-center gap-3">
            <FileText className="w-7 h-7 text-emerald-400" />
            <span>Site Content & UPI Settings Editor</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamically edit hero section titles, payment QR code details, and official contact information across the site.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("hero")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "hero" ? "bg-emerald-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero Banner</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("scanner")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "scanner" ? "bg-emerald-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>UPI & Payment Scanner</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "contact" ? "bg-emerald-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Contact Details</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl p-4 flex items-center gap-3 text-xs font-semibold">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* TAB 1: HERO SECTION */}
      {activeTab === "hero" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Home Page Hero Section Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Hero Main Headline (Uppercase)
              </label>
              <textarea
                rows={3}
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Highlighted Word in Headline (e.g. VITAL)
              </label>
              <input
                type="text"
                value={heroHighlight}
                onChange={(e) => setHeroHighlight(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Hero Subtitle Description Box
              </label>
              <textarea
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-medium text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Hero Background Image URL
              </label>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            disabled={isSaving}
            onClick={() =>
              handleSave("hero", {
                title: heroTitle,
                highlight: heroHighlight,
                subtitle: heroSubtitle,
                backgroundImage: heroImage,
              })
            }
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Hero Banner Changes</span>
          </button>
        </div>
      )}

      {/* TAB 2: UPI & PAYMENT SCANNER */}
      {activeTab === "scanner" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Payment Scanner & UPI Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Official UPI VPA ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Account Name / Beneficiary Name
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono font-bold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                IFSC Code
              </label>
              <input
                type="text"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono font-bold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                80G Tax Exemption Note
              </label>
              <textarea
                rows={2}
                value={taxNote}
                onChange={(e) => setTaxNote(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            disabled={isSaving}
            onClick={() =>
              handleSave("payment_scanner", {
                upiId,
                accountName,
                bankName,
                accountNumber,
                ifscCode,
                taxNote,
              })
            }
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Payment Scanner Settings</span>
          </button>
        </div>
      )}

      {/* TAB 3: CONTACT DETAILS */}
      {activeTab === "contact" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Contact Information & Address
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Contact Email Address
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Contact Phone Number
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Official Secretariat Address
              </label>
              <textarea
                rows={3}
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            disabled={isSaving}
            onClick={() =>
              handleSave("contact_info", {
                email: contactEmail,
                phone: contactPhone,
                address: contactAddress,
              })
            }
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Contact Info Changes</span>
          </button>
        </div>
      )}
    </div>
  );
}
