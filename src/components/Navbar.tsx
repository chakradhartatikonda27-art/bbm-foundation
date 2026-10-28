"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ChevronDown, Phone, Mail } from "lucide-react";
import MobileMenu from "./MobileMenu";
import DonateModal from "./DonateModal";

interface NavbarProps {
  branding?: {
    logoUrl?: string;
    siteName?: string;
    tagline?: string;
  };
}

export default function Navbar({ branding }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const pathname = usePathname();

  const logoUrl = branding?.logoUrl || "/logo.png";
  const siteName = branding?.siteName || "BBM FOUNDATION";
  const tagline = branding?.tagline || "World For Children & Families";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Stories", href: "/stories" },
    { name: "Take action", href: "/get-involved" },
    { name: "Events", href: "/events" },
    { name: "Our Work", href: "/our-work" },
    { name: "Contact", href: "/contact" },
  ];

  const resourceDropdownItems = [
    { name: "BBM Roadmap", href: "/resources/roadmap" },
    { name: "Videos", href: "/resources/videos" },
    { name: "For Communities & Churches", href: "/resources/community" },
    { name: "Child Protection Day", href: "/resources/protection-day" },
    { name: "Hope Groups", href: "/resources/hope-groups" },
    { name: "e-Learning", href: "/resources/e-learning" },
  ];

  const isHomepage = pathname === "/";
  const shouldBeTransparent = isHomepage && !isScrolled;

  const linkColorClass = shouldBeTransparent
    ? "text-slate-100 hover:text-emerald-400"
    : "text-slate-700 hover:text-emerald-700";
  const activeColorClass = shouldBeTransparent
    ? "text-white font-bold border-b-2 border-emerald-400"
    : "text-[#114227] font-bold border-b-2 border-[#114227]";
  const logoTextClass = shouldBeTransparent
    ? "text-white group-hover:text-emerald-300"
    : "text-[#114227] group-hover:text-emerald-700";

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          shouldBeTransparent
            ? "bg-gradient-to-b from-black/70 via-black/40 to-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
        }`}
      >
        {/* Top Utility Bar */}
        <div
          className={`w-full text-xs transition-colors duration-300 border-b ${
            shouldBeTransparent
              ? "bg-black/40 text-slate-200 border-white/10"
              : "bg-[#0d331e] text-emerald-100 border-emerald-950/20"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-3">
            {/* Left: Contact Info */}
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
              <a
                href="tel:+918500863000"
                className="inline-flex items-center gap-1.5 hover:text-emerald-300 transition-colors font-medium text-[11px] sm:text-xs"
                title="Call BBM Foundation"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>+91 8500863000</span>
              </a>
              <a
                href="mailto:bbmindiafoundation@gmail.com"
                className="hidden md:inline-flex items-center gap-1.5 hover:text-emerald-300 transition-colors text-[11px] sm:text-xs"
                title="Email BBM Foundation"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>bbmindiafoundation@gmail.com</span>
              </a>
              <span className="hidden lg:inline-block text-emerald-400/40">•</span>
              <span className="hidden lg:inline-block text-emerald-300/80 text-[11px]">
                Regd. NGO: 551/401/2026/AP-NSP
              </span>
            </div>

            {/* Right: Social Media Icons (WhatsApp, Facebook, Instagram, YouTube) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] font-semibold text-emerald-300/70 hidden sm:inline-block mr-1">
                Follow Us:
              </span>

              {/* WhatsApp Direct Chat */}
              <a
                href="https://wa.me/918500863000?text=Hello%20BBM%20Foundation%2C%20I%20would%20like%20to%20know%20more%20about%20your%20programs."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600/30 hover:bg-emerald-500 text-emerald-300 hover:text-white transition-all text-[11px] font-semibold border border-emerald-500/30"
                aria-label="Chat on WhatsApp"
                title="Chat with BBM Foundation on WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:bg-emerald-800/40 text-slate-300 hover:text-white transition-all"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:bg-emerald-800/40 text-slate-300 hover:text-white transition-all"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:bg-emerald-800/40 text-slate-300 hover:text-white transition-all"
                aria-label="YouTube"
                title="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="group focus:outline-none flex items-center gap-3">
                <img
                  src={logoUrl}
                  alt={`${siteName} Logo`}
                  className="h-11 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105 filter drop-shadow-sm rounded-md"
                />
                <div className="flex flex-col">
                  <span className={`font-display font-black text-lg sm:text-xl tracking-tight transition-colors ${logoTextClass}`}>
                    {siteName}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-500 -mt-1 hidden sm:block">
                    {tagline}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-semibold transition-all py-1 ${
                      isActive ? activeColorClass : linkColorClass
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Resources Dropdown Menu matching Screenshot 1 */}
              <div 
                className="relative"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className={`inline-flex items-center gap-1 text-sm font-semibold py-1 transition-all ${
                    pathname.startsWith("/resources")
                      ? (shouldBeTransparent ? "bg-[#2563eb] text-white px-3 py-1 rounded-full font-bold" : "bg-[#2563eb] text-white px-3 py-1 rounded-full font-bold")
                      : linkColorClass
                  }`}
                >
                  Resources
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* Dropdown Card matching Screenshot 1 dark floating menu */}
                {isResourcesOpen && (
                  <div className="absolute right-0 top-full pt-2 w-56 animate-fade-in z-50">
                    <div className="bg-[#2a2d32] text-white rounded-2xl shadow-2xl p-2 border border-slate-700/60 space-y-1">
                      {resourceDropdownItems.map((item) => {
                        const isSubActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsResourcesOpen(false)}
                            className={`block px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                              isSubActive
                                ? "bg-[#2563eb] text-white font-bold"
                                : "text-slate-200 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Header Actions: Green Pill Donate Button */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsDonateOpen(true)}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-black bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200 shadow-md hover:shadow-emerald-600/30 scale-105 active:scale-95"
              >
                Donate
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setIsDonateOpen(true)}
                className="px-4 py-1.5 rounded-full text-xs font-black bg-emerald-600 text-white shadow-sm"
              >
                Donate
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${
                  shouldBeTransparent ? "text-white" : "text-slate-800"
                }`}
                aria-expanded={isOpen}
                aria-label="Open main menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpenDonate={() => {
          setIsOpen(false);
          setIsDonateOpen(true);
        }}
        navLinks={navLinks}
      />

      {/* Global Donate Modal */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />
    </>
  );
}
