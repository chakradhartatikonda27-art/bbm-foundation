"use client";

import { useState } from "react";
import {
  Save,
  CheckCircle,
  QrCode,
  FileText,
  Sparkles,
  Building,
  Phone,
  Mail,
  Layout,
  Info,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Zap,
  MessageSquareQuote,
  Compass,
  BookOpen,
} from "lucide-react";
import ImageUploadInput from "@/components/ImageUploadInput";

interface SiteContentClientProps {
  initialContent: Record<string, any>;
}

export default function SiteContentClient({ initialContent }: SiteContentClientProps) {
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 1. Branding & Header Form
  const [branding, setBranding] = useState({
    logoUrl: initialContent?.branding?.logoUrl || "/logo.png",
    siteName: initialContent?.branding?.siteName || "BBM FOUNDATION",
    tagline: initialContent?.branding?.tagline || "Building Lives • Creating Opportunities • Serving Humanity",
  });

  // 2. Hero Section Form
  const [hero, setHero] = useState({
    badge: initialContent?.hero?.badge || "Instant & Direct Impact",
    title: initialContent?.hero?.title || "YOU CAN PLAY A VITAL ROLE IN ATTAINING A WORLD WITHOUT ORPHANS",
    highlight: initialContent?.hero?.highlight || "VITAL",
    subtitle:
      initialContent?.hero?.subtitle ||
      "Everything we do together multiplies, so with your participation, millions of children can grow up in strong families and know their identity with a loving future.",
    primaryCtaText: initialContent?.hero?.primaryCtaText || "Donate Now",
    primaryCtaLink: initialContent?.hero?.primaryCtaLink || "/donate",
    secondaryCtaText: initialContent?.hero?.secondaryCtaText || "Explore Our Work",
    secondaryCtaLink: initialContent?.hero?.secondaryCtaLink || "/our-work",
    backgroundImage: initialContent?.hero?.backgroundImage || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920",
  });

  // 3. Quick Action Cards Form
  const [actionCards, setActionCards] = useState(
    initialContent?.action_cards || [
      { title: "Give Today", subtitle: "Transform lives with direct child & family support", buttonText: "Donate Now", link: "/donate" },
      { title: "Volunteer", subtitle: "Join our on-ground movement & mentorship groups", buttonText: "Get Involved", link: "/get-involved?tab=volunteer" },
      { title: "Partner With Us", subtitle: "CSR collaborations for institutional impact", buttonText: "Corporate CSR", link: "/get-involved?tab=partner" },
      { title: "Support Initiative", subtitle: "Fund education kits, protection & reunification", buttonText: "Explore Projects", link: "/get-involved?tab=initiative" },
    ]
  );

  // 4. Mission & Vision Section Form
  const [missionVision, setMissionVision] = useState({
    badge: initialContent?.mission_vision?.badge || "Our Mission & Vision",
    heading: initialContent?.mission_vision?.heading || "Building Stronger Families & Empowering Communities",
    paragraph1:
      initialContent?.mission_vision?.paragraph1 ||
      "BBM Foundation is committed to creating sustainable social change through orphan care, family strengthening, youth mentorship, and education access.",
    paragraph2:
      initialContent?.mission_vision?.paragraph2 ||
      "We believe that every child deserves a loving family, quality education, and the opportunity to build a dignified future.",
    imageUrl: initialContent?.mission_vision?.imageUrl || "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200",
    pillar1Title: initialContent?.mission_vision?.pillar1Title || "Child & Family Care",
    pillar1Desc: initialContent?.mission_vision?.pillar1Desc || "Family reunification, foster care support & child protection.",
    pillar2Title: initialContent?.mission_vision?.pillar2Title || "Prerna Education",
    pillar2Desc: initialContent?.mission_vision?.pillar2Desc || "School kits, digital literacy & academic sponsorships.",
    pillar3Title: initialContent?.mission_vision?.pillar3Title || "Suraksha Protection",
    pillar3Desc: initialContent?.mission_vision?.pillar3Desc || "Girl child safety, health campaigns & legal guidance.",
    pillar4Title: initialContent?.mission_vision?.pillar4Title || "Swashakti Youth",
    pillar4Desc: initialContent?.mission_vision?.pillar4Desc || "Skill development, vocational training & leadership.",
  });

  // 5. Callout / Testimonial Banner Form
  const [callout, setCallout] = useState({
    quote:
      initialContent?.callout?.quote ||
      "When we empower a single child with love and education, we transform generations. BBM Foundation stands as a bridge of hope for every family.",
    authorName: initialContent?.callout?.authorName || "Dr. B. Giribabu",
    authorRole: initialContent?.callout?.authorRole || "President & Managing Trustee",
    bgImage: initialContent?.callout?.bgImage || "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600",
  });

  // 6. Payment Scanner Form
  const [scanner, setScanner] = useState({
    upiId: initialContent?.payment_scanner?.upiId || "QR919885126368-0750@unionbankofindia",
    qrImageUrl: initialContent?.payment_scanner?.qrImageUrl || "/union_bank_qr.png",
    accountName: initialContent?.payment_scanner?.accountName || "BBM FOUNDATION",
    bankName: initialContent?.payment_scanner?.bankName || "Union Bank of India",
    accountNumber: initialContent?.payment_scanner?.accountNumber || "551401010050750",
    ifscCode: initialContent?.payment_scanner?.ifscCode || "UBIN0555142",
    branch: initialContent?.payment_scanner?.branch || "Narsipatnam Branch",
    panNumber: initialContent?.payment_scanner?.panNumber || "AAFTB3316H",
    taxNote:
      initialContent?.payment_scanner?.taxNote ||
      "Donations to BBM Foundation are eligible for 80G tax benefit certificate under the Income Tax Act.",
  });

  // 7. About Page Form
  const [aboutPage, setAboutPage] = useState({
    title: initialContent?.about_page?.title || "About BBM Foundation",
    subtitle:
      initialContent?.about_page?.subtitle ||
      "Dedicated to restoring families, educating children, and empowering communities across Andhra Pradesh & Telangana.",
    history:
      initialContent?.about_page?.history ||
      "Founded with a vision to eliminate orphanhood and uplift underprivileged communities, BBM Foundation has touched thousands of lives through direct action and partnership.",
    mission:
      initialContent?.about_page?.mission ||
      "To enable every child to thrive within a loving family and access life-changing opportunities for education and growth.",
    vision:
      initialContent?.about_page?.vision ||
      "A compassionate society where zero children are left orphaned or without quality education and protection.",
    value1Title: initialContent?.about_page?.value1Title || "Compassion First",
    value1Desc: initialContent?.about_page?.value1Desc || "Serving every individual with dignity and unconditional care.",
    value2Title: initialContent?.about_page?.value2Title || "Transparency",
    value2Desc: initialContent?.about_page?.value2Desc || "100% financial and operational accountability in every project.",
    value3Title: initialContent?.about_page?.value3Title || "Community Impact",
    value3Desc: initialContent?.about_page?.value3Desc || "Sustainable programs designed for long-term community transformation.",
    value4Title: initialContent?.about_page?.value4Title || "Integrity",
    value4Desc: initialContent?.about_page?.value4Desc || "Upholding statutory compliance and ethical governance at all levels.",
  });

  // 8. Our Work Page Form
  const [ourWorkPage, setOurWorkPage] = useState({
    title: initialContent?.our_work_page?.title || "Our Initiatives & Programs",
    subtitle:
      initialContent?.our_work_page?.subtitle ||
      "Comprehensive social programs focusing on child care, education, youth skills, and emergency relief.",
    overview:
      initialContent?.our_work_page?.overview ||
      "From grass-roots education drives to strategic family reunification, explore our core initiatives across South India.",
  });

  // 9. Impact Page Form
  const [impactPage, setImpactPage] = useState({
    title: initialContent?.impact_page?.title || "Real Lives, Measurable Impact",
    subtitle:
      initialContent?.impact_page?.subtitle ||
      "Tracking our footprint across children educated, families reunited, and communities empowered.",
    overview:
      initialContent?.impact_page?.overview ||
      "Every contribution directly powers transparent, verified milestones on the ground.",
  });

  // 10. Contact & Offices Form
  const [contact, setContact] = useState({
    title: initialContent?.contact_info?.title || "Connect With Our Office",
    subtitle:
      initialContent?.contact_info?.subtitle ||
      "Have questions about our programs, audit reports, or want to coordinate support? Get in touch with our coordination team.",
    leaderName: initialContent?.contact_info?.leaderName || "Dr. B. Giribabu",
    leaderRole: initialContent?.contact_info?.leaderRole || "President & Managing Trustee",
    regAddress:
      initialContent?.contact_info?.regAddress ||
      "# 3-150, Main Street, Bypureddy Palem, Narsipatnam, Anakapalli Dist., A.P. - 531116",
    corpAddress:
      initialContent?.contact_info?.corpAddress ||
      "# 4-6-17/1, S1, Kamal's Castle, Savarkar Nagar, Nacharam, Hyd - 500076, Telangana",
    phone: initialContent?.contact_info?.phone || "+91 8500863000 / +91 9885126368",
    email: initialContent?.contact_info?.email || "bbmindiafoundation@gmail.com",
  });

  // 11. Statutory & Transparency Form
  const [transparency, setTransparency] = useState({
    title: initialContent?.transparency_info?.title || "Governance & Statutory Transparency",
    subtitle:
      initialContent?.transparency_info?.subtitle ||
      "As a serious social-impact organization, BBM Foundation operates under complete compliance codes, reporting audited financial sheets, terms, and safeguards.",
    panNumber: initialContent?.transparency_info?.panNumber || "AAFTB3316H",
    formationDate: initialContent?.transparency_info?.formationDate || "16/11/2023",
    taxStatus: initialContent?.transparency_info?.taxStatus || "80G Certified",
    bankPartner: initialContent?.transparency_info?.bankPartner || "Union Bank of India",
    auditPromise:
      initialContent?.transparency_info?.auditPromise ||
      "BBM Foundation is officially incorporated under the Income Tax Department Govt. of India with e-PAN Card AAFTB3316H (Incorporation: 16/11/2023). All contributions directly support charitable and social-impact initiatives.",
    legalEmail: initialContent?.transparency_info?.legalEmail || "compliance@bbmfoundation.org",
  });

  // 12. Footer Form
  const [footer, setFooter] = useState({
    description:
      initialContent?.footer_info?.description ||
      "A premium social-impact and charitable foundation committed to creating meaningful change through service, opportunity creation, community development, and humanitarian initiatives.",
    regAddress:
      initialContent?.footer_info?.regAddress ||
      "# 3-150, Main Street, Bypureddy Palem, Narsipatnam, Anakapalli Dist., A.P. - 531116",
    corpAddress:
      initialContent?.footer_info?.corpAddress ||
      "# 4-6-17/1, S1, Kamal's Castle, Savarkar Nagar, Nacharam, Hyd - 500076, Telangana",
    phone: initialContent?.footer_info?.phone || "+91 8500863000 / +91 9885126368",
    email: initialContent?.footer_info?.email || "bbmindiafoundation@gmail.com",
    copyright: initialContent?.footer_info?.copyright || "© BBM FOUNDATION. All Rights Reserved.",
  });

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
        setSuccessMessage(`Successfully updated ${key.replace("_", " ").toUpperCase()} settings!`);
        setTimeout(() => setSuccessMessage(null), 3500);
      } else {
        alert(data.error || "Failed to update site content");
      }
    } catch {
      alert("Network error occurred while saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  // 13. Roadmap & Resources Services Form
  const [roadmapPage, setRoadmapPage] = useState({
    title: initialContent?.roadmap_page?.title || "The BBM Roadmap",
    subtitle: initialContent?.roadmap_page?.subtitle || "Our 4-quadrant strategic guide for orphanhood prevention, family reunification, and community collaboration.",
    cornerstone1Title: initialContent?.roadmap_page?.cornerstone1Title || "Prevention",
    cornerstone1Desc: initialContent?.roadmap_page?.cornerstone1Desc || "Strengthening families before crisis occurs through economic enablement, parenting education, and community support networks.",
    cornerstone2Title: initialContent?.roadmap_page?.cornerstone2Title || "Broadscale Collaboration",
    cornerstone2Desc: initialContent?.roadmap_page?.cornerstone2Desc || "Uniting governments, NGOs, churches, and civic leaders under a shared mission to serve vulnerable children.",
    cornerstone3Title: initialContent?.roadmap_page?.cornerstone3Title || "Intervention",
    cornerstone3Desc: initialContent?.roadmap_page?.cornerstone3Desc || "Providing immediate foster care, legal protection, and safe havens for children in emergency situations.",
    cornerstone4Title: initialContent?.roadmap_page?.cornerstone4Title || "Living Refreshed",
    cornerstone4Desc: initialContent?.roadmap_page?.cornerstone4Desc || "Sustaining caregivers and advocates with spiritual renewal, mental health support, and peer hope groups.",
  });

  const tabs = [
    { id: "hero", label: "Hero Banner", icon: Sparkles },
    { id: "branding", label: "Branding & Logo", icon: Layout },
    { id: "action_cards", label: "Action Cards", icon: Zap },
    { id: "mission_vision", label: "Mission & Vision", icon: Compass },
    { id: "callout", label: "Callout Banner", icon: MessageSquareQuote },
    { id: "scanner", label: "Payment & UPI", icon: QrCode },
    { id: "about", label: "About Page", icon: Info },
    { id: "our_work", label: "Our Work Page", icon: Briefcase },
    { id: "impact", label: "Impact Page", icon: TrendingUp },
    { id: "roadmap", label: "BBM Roadmap", icon: BookOpen },
    { id: "contact", label: "Contact & Offices", icon: Building },
    { id: "transparency", label: "Transparency", icon: ShieldCheck },
    { id: "footer", label: "Footer Section", icon: FileText },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-emerald-400" />
            <span>Complete Website Content & Image CMS</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Edit every text headline, description, banner image, payment QR code, address, and section across the entire website live.
          </p>
        </div>
      </div>

      {/* Tabs Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left ${
                isActive
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl p-4 flex items-center gap-3 text-xs font-semibold animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* TAB 1: HERO SECTION */}
      {activeTab === "hero" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Home Page Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Badge Text</label>
              <input
                type="text"
                value={hero.badge}
                onChange={(e) => setHero({ ...hero, badge: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Main Headline</label>
              <textarea
                rows={2}
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Highlighted Word</label>
              <input
                type="text"
                value={hero.highlight}
                onChange={(e) => setHero({ ...hero, highlight: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subtitle Description</label>
              <textarea
                rows={3}
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-medium text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={hero.primaryCtaText}
                  onChange={(e) => setHero({ ...hero, primaryCtaText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary CTA Link</label>
                <input
                  type="text"
                  value={hero.primaryCtaLink}
                  onChange={(e) => setHero({ ...hero, primaryCtaLink: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono text-emerald-400 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Secondary CTA Button Text</label>
                <input
                  type="text"
                  value={hero.secondaryCtaText}
                  onChange={(e) => setHero({ ...hero, secondaryCtaText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Secondary CTA Link</label>
                <input
                  type="text"
                  value={hero.secondaryCtaLink}
                  onChange={(e) => setHero({ ...hero, secondaryCtaLink: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono text-emerald-400 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
            <ImageUploadInput
              label="Upload Hero Background Photo from Computer / Drive"
              value={hero.backgroundImage}
              onChange={(url) => setHero({ ...hero, backgroundImage: url })}
            />
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("hero", hero)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Hero Banner Settings</span>
          </button>
        </div>
      )}

      {/* TAB 2: BRANDING & LOGO */}
      {activeTab === "branding" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Header Branding & Site Logo
          </h2>
          <div className="space-y-4">
            <ImageUploadInput
              label="Upload Official Logo Photo from Computer / Drive"
              value={branding.logoUrl}
              onChange={(url) => setBranding({ ...branding, logoUrl: url })}
            />
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Foundation / Site Name</label>
              <input
                type="text"
                value={branding.siteName}
                onChange={(e) => setBranding({ ...branding, siteName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Official Tagline</label>
              <input
                type="text"
                value={branding.tagline}
                onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-medium text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("branding", branding)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Branding Settings</span>
          </button>
        </div>
      )}

      {/* TAB 3: ACTION CARDS */}
      {activeTab === "action_cards" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Home Page Quick Action Cards (4 Cards)
          </h2>
          <div className="space-y-6">
            {actionCards.map((card: any, idx: number) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Card #{idx + 1}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Card Title"
                    value={card.title}
                    onChange={(e) => {
                      const updated = [...actionCards];
                      updated[idx].title = e.target.value;
                      setActionCards(updated);
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Button Text"
                    value={card.buttonText}
                    onChange={(e) => {
                      const updated = [...actionCards];
                      updated[idx].buttonText = e.target.value;
                      setActionCards(updated);
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subtitle Description"
                  value={card.subtitle}
                  onChange={(e) => {
                    const updated = [...actionCards];
                    updated[idx].subtitle = e.target.value;
                    setActionCards(updated);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Destination URL Link"
                  value={card.link}
                  onChange={(e) => {
                    const updated = [...actionCards];
                    updated[idx].link = e.target.value;
                    setActionCards(updated);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-emerald-400 focus:outline-none"
                />
                <ImageUploadInput
                  label={`Upload Card #${idx + 1} Photo from Computer / Drive`}
                  value={card.imageUrl || ""}
                  onChange={(url) => {
                    const updated = [...actionCards];
                    updated[idx].imageUrl = url;
                    setActionCards(updated);
                  }}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("action_cards", actionCards)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Quick Action Cards</span>
          </button>
        </div>
      )}

      {/* TAB 4: MISSION & VISION */}
      {activeTab === "mission_vision" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Home Page Mission & Core Pillars Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Section Badge</label>
              <input
                type="text"
                value={missionVision.badge}
                onChange={(e) => setMissionVision({ ...missionVision, badge: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Main Heading</label>
              <input
                type="text"
                value={missionVision.heading}
                onChange={(e) => setMissionVision({ ...missionVision, heading: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Paragraph 1</label>
              <textarea
                rows={3}
                value={missionVision.paragraph1}
                onChange={(e) => setMissionVision({ ...missionVision, paragraph1: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Paragraph 2</label>
              <textarea
                rows={3}
                value={missionVision.paragraph2}
                onChange={(e) => setMissionVision({ ...missionVision, paragraph2: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300 focus:outline-none"
              />
            </div>
            <ImageUploadInput
              label="Upload Mission & Vision Side Photo from Computer / Drive"
              value={missionVision.imageUrl}
              onChange={(url) => setMissionVision({ ...missionVision, imageUrl: url })}
            />

            <div className="pt-4 border-t border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">4 Core Pillars</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <input
                    type="text"
                    placeholder="Pillar 1 Title"
                    value={missionVision.pillar1Title}
                    onChange={(e) => setMissionVision({ ...missionVision, pillar1Title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs font-bold text-white"
                  />
                  <input
                    type="text"
                    placeholder="Pillar 1 Description"
                    value={missionVision.pillar1Desc}
                    onChange={(e) => setMissionVision({ ...missionVision, pillar1Desc: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-300"
                  />
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <input
                    type="text"
                    placeholder="Pillar 2 Title"
                    value={missionVision.pillar2Title}
                    onChange={(e) => setMissionVision({ ...missionVision, pillar2Title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs font-bold text-white"
                  />
                  <input
                    type="text"
                    placeholder="Pillar 2 Description"
                    value={missionVision.pillar2Desc}
                    onChange={(e) => setMissionVision({ ...missionVision, pillar2Desc: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-300"
                  />
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <input
                    type="text"
                    placeholder="Pillar 3 Title"
                    value={missionVision.pillar3Title}
                    onChange={(e) => setMissionVision({ ...missionVision, pillar3Title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs font-bold text-white"
                  />
                  <input
                    type="text"
                    placeholder="Pillar 3 Description"
                    value={missionVision.pillar3Desc}
                    onChange={(e) => setMissionVision({ ...missionVision, pillar3Desc: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-300"
                  />
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <input
                    type="text"
                    placeholder="Pillar 4 Title"
                    value={missionVision.pillar4Title}
                    onChange={(e) => setMissionVision({ ...missionVision, pillar4Title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs font-bold text-white"
                  />
                  <input
                    type="text"
                    placeholder="Pillar 4 Description"
                    value={missionVision.pillar4Desc}
                    onChange={(e) => setMissionVision({ ...missionVision, pillar4Desc: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("mission_vision", missionVision)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Mission & Core Pillars</span>
          </button>
        </div>
      )}

      {/* TAB 5: CALLOUT BANNER */}
      {activeTab === "callout" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Home Page Callout / Testimonial Banner
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quote Text</label>
              <textarea
                rows={3}
                value={callout.quote}
                onChange={(e) => setCallout({ ...callout, quote: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm italic text-slate-200 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Author Name</label>
                <input
                  type="text"
                  value={callout.authorName}
                  onChange={(e) => setCallout({ ...callout, authorName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Author Role / Title</label>
                <input
                  type="text"
                  value={callout.authorRole}
                  onChange={(e) => setCallout({ ...callout, authorRole: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300 focus:outline-none"
                />
              </div>
            </div>
            <ImageUploadInput
              label="Upload Callout Banner Photo from Computer / Drive"
              value={callout.bgImage}
              onChange={(url) => setCallout({ ...callout, bgImage: url })}
            />
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("callout", callout)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Callout Banner</span>
          </button>
        </div>
      )}

      {/* TAB 6: SCANNER & PAYMENT */}
      {activeTab === "scanner" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Payment Scanner & Bank Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Official UPI VPA ID</label>
              <input
                type="text"
                value={scanner.upiId}
                onChange={(e) => setScanner({ ...scanner, upiId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono font-bold text-emerald-400 focus:outline-none"
              />
            </div>
            <ImageUploadInput
              label="Upload Payment QR Scanner Photo from Computer / Drive"
              value={scanner.qrImageUrl}
              onChange={(url) => setScanner({ ...scanner, qrImageUrl: url })}
            />
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Account Name</label>
              <input
                type="text"
                value={scanner.accountName}
                onChange={(e) => setScanner({ ...scanner, accountName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bank Name</label>
              <input
                type="text"
                value={scanner.bankName}
                onChange={(e) => setScanner({ ...scanner, bankName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Account Number</label>
              <input
                type="text"
                value={scanner.accountNumber}
                onChange={(e) => setScanner({ ...scanner, accountNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono font-bold text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">IFSC Code</label>
              <input
                type="text"
                value={scanner.ifscCode}
                onChange={(e) => setScanner({ ...scanner, ifscCode: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono font-bold text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Branch Name</label>
              <input
                type="text"
                value={scanner.branch}
                onChange={(e) => setScanner({ ...scanner, branch: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">PAN Number</label>
              <input
                type="text"
                value={scanner.panNumber}
                onChange={(e) => setScanner({ ...scanner, panNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono font-bold text-emerald-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">80G Tax Exemption Note</label>
              <textarea
                rows={2}
                value={scanner.taxNote}
                onChange={(e) => setScanner({ ...scanner, taxNote: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("payment_scanner", scanner)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Payment Scanner Settings</span>
          </button>
        </div>
      )}

      {/* TAB 7: ABOUT PAGE */}
      {activeTab === "about" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">About Us Page</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Page Header Title</label>
              <input
                type="text"
                value={aboutPage.title}
                onChange={(e) => setAboutPage({ ...aboutPage, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Page Header Subtitle</label>
              <textarea
                rows={2}
                value={aboutPage.subtitle}
                onChange={(e) => setAboutPage({ ...aboutPage, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Foundation History / Story</label>
              <textarea
                rows={3}
                value={aboutPage.history}
                onChange={(e) => setAboutPage({ ...aboutPage, history: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mission Statement</label>
                <textarea
                  rows={3}
                  value={aboutPage.mission}
                  onChange={(e) => setAboutPage({ ...aboutPage, mission: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Vision Statement</label>
                <textarea
                  rows={3}
                  value={aboutPage.vision}
                  onChange={(e) => setAboutPage({ ...aboutPage, vision: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("about_page", aboutPage)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save About Page Content</span>
          </button>
        </div>
      )}

      {/* TAB 8: OUR WORK PAGE */}
      {activeTab === "our_work" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">Our Work Page</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Header Title</label>
              <input
                type="text"
                value={ourWorkPage.title}
                onChange={(e) => setOurWorkPage({ ...ourWorkPage, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Header Subtitle</label>
              <textarea
                rows={2}
                value={ourWorkPage.subtitle}
                onChange={(e) => setOurWorkPage({ ...ourWorkPage, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview Description</label>
              <textarea
                rows={3}
                value={ourWorkPage.overview}
                onChange={(e) => setOurWorkPage({ ...ourWorkPage, overview: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("our_work_page", ourWorkPage)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Our Work Page</span>
          </button>
        </div>
      )}

      {/* TAB 9: IMPACT PAGE */}
      {activeTab === "impact" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">Impact Page</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Header Title</label>
              <input
                type="text"
                value={impactPage.title}
                onChange={(e) => setImpactPage({ ...impactPage, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Header Subtitle</label>
              <textarea
                rows={2}
                value={impactPage.subtitle}
                onChange={(e) => setImpactPage({ ...impactPage, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Impact Overview</label>
              <textarea
                rows={3}
                value={impactPage.overview}
                onChange={(e) => setImpactPage({ ...impactPage, overview: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("impact_page", impactPage)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Impact Page</span>
          </button>
        </div>
      )}

      {/* TAB 10: CONTACT & OFFICES */}
      {activeTab === "contact" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Contact Information & Offices
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Leader / President Name</label>
                <input
                  type="text"
                  value={contact.leaderName}
                  onChange={(e) => setContact({ ...contact, leaderName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Leader Designation</label>
                <input
                  type="text"
                  value={contact.leaderRole}
                  onChange={(e) => setContact({ ...contact, leaderRole: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Registered Office Address</label>
              <textarea
                rows={2}
                value={contact.regAddress}
                onChange={(e) => setContact({ ...contact, regAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Corporate Office Address</label>
              <textarea
                rows={2}
                value={contact.corpAddress}
                onChange={(e) => setContact({ ...contact, corpAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Telephone Numbers</label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Official Email</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white"
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("contact_info", contact)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Contact Info</span>
          </button>
        </div>
      )}

      {/* TAB 11: TRANSPARENCY */}
      {activeTab === "transparency" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            Statutory Transparency & Compliance
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">PAN Number</label>
                <input
                  type="text"
                  value={transparency.panNumber}
                  onChange={(e) => setTransparency({ ...transparency, panNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono font-bold text-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Formation Date</label>
                <input
                  type="text"
                  value={transparency.formationDate}
                  onChange={(e) => setTransparency({ ...transparency, formationDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tax Exemption</label>
                <input
                  type="text"
                  value={transparency.taxStatus}
                  onChange={(e) => setTransparency({ ...transparency, taxStatus: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bank Partner</label>
                <input
                  type="text"
                  value={transparency.bankPartner}
                  onChange={(e) => setTransparency({ ...transparency, bankPartner: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Audit Promise / Verification Note</label>
              <textarea
                rows={3}
                value={transparency.auditPromise}
                onChange={(e) => setTransparency({ ...transparency, auditPromise: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Legal Email</label>
              <input
                type="email"
                value={transparency.legalEmail}
                onChange={(e) => setTransparency({ ...transparency, legalEmail: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-semibold text-white"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("transparency_info", transparency)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Transparency Settings</span>
          </button>
        </div>
      )}

      {/* TAB 12: FOOTER SECTION */}
      {activeTab === "footer" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">Footer Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Foundation Description</label>
              <textarea
                rows={3}
                value={footer.description}
                onChange={(e) => setFooter({ ...footer, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Registered Office Address</label>
              <textarea
                rows={2}
                value={footer.regAddress}
                onChange={(e) => setFooter({ ...footer, regAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Corporate Office Address</label>
              <textarea
                rows={2}
                value={footer.corpAddress}
                onChange={(e) => setFooter({ ...footer, corpAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                <input
                  type="text"
                  value={footer.phone}
                  onChange={(e) => setFooter({ ...footer, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  value={footer.email}
                  onChange={(e) => setFooter({ ...footer, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Copyright Text</label>
              <input
                type="text"
                value={footer.copyright}
                onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("footer_info", footer)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Footer Settings</span>
          </button>
        </div>
      )}

      {/* TAB 13: ROADMAP & SERVICE CORNERSTONES */}
      {activeTab === "roadmap" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-3">
            BBM Roadmap & Service Cornerstones
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Roadmap Page Title</label>
              <input
                type="text"
                value={roadmapPage.title}
                onChange={(e) => setRoadmapPage({ ...roadmapPage, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Roadmap Subtitle</label>
              <textarea
                rows={2}
                value={roadmapPage.subtitle}
                onChange={(e) => setRoadmapPage({ ...roadmapPage, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-300"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <input
                  type="text"
                  placeholder="Cornerstone 1 Title"
                  value={roadmapPage.cornerstone1Title}
                  onChange={(e) => setRoadmapPage({ ...roadmapPage, cornerstone1Title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs font-bold text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Cornerstone 1 Description"
                  value={roadmapPage.cornerstone1Desc}
                  onChange={(e) => setRoadmapPage({ ...roadmapPage, cornerstone1Desc: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-300"
                />
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <input
                  type="text"
                  placeholder="Cornerstone 2 Title"
                  value={roadmapPage.cornerstone2Title}
                  onChange={(e) => setRoadmapPage({ ...roadmapPage, cornerstone2Title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs font-bold text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Cornerstone 2 Description"
                  value={roadmapPage.cornerstone2Desc}
                  onChange={(e) => setRoadmapPage({ ...roadmapPage, cornerstone2Desc: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-300"
                />
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <input
                  type="text"
                  placeholder="Cornerstone 3 Title"
                  value={roadmapPage.cornerstone3Title}
                  onChange={(e) => setRoadmapPage({ ...roadmapPage, cornerstone3Title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs font-bold text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Cornerstone 3 Description"
                  value={roadmapPage.cornerstone3Desc}
                  onChange={(e) => setRoadmapPage({ ...roadmapPage, cornerstone3Desc: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-300"
                />
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <input
                  type="text"
                  placeholder="Cornerstone 4 Title"
                  value={roadmapPage.cornerstone4Title}
                  onChange={(e) => setRoadmapPage({ ...roadmapPage, cornerstone4Title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs font-bold text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Cornerstone 4 Description"
                  value={roadmapPage.cornerstone4Desc}
                  onChange={(e) => setRoadmapPage({ ...roadmapPage, cornerstone4Desc: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-300"
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("roadmap_page", roadmapPage)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save BBM Roadmap Cornerstones</span>
          </button>
        </div>
      )}
    </div>
  );
}
