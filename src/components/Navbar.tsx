"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";
import DonateModal from "./DonateModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const pathname = usePathname();

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
  const iconColorClass = shouldBeTransparent
    ? "text-slate-200 hover:text-white"
    : "text-slate-600 hover:text-emerald-700";

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          shouldBeTransparent
            ? "bg-gradient-to-b from-black/60 via-black/30 to-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Social Icons */}
            <div className="flex items-center gap-6">
              <Link href="/" className="group focus:outline-none flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-md group-hover:scale-105 transition-transform">
                  BBM
                </div>
                <div className="flex flex-col">
                  <span className={`font-display font-black text-lg sm:text-xl tracking-tight transition-colors ${logoTextClass}`}>
                    BBM FOUNDATION
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-500 -mt-1 hidden sm:block">
                    World For Children & Families
                  </span>
                </div>
              </Link>

              {/* Social Icons matching WWO reference navbar */}
              <div className={`hidden md:flex items-center gap-3 pl-4 border-l ${shouldBeTransparent ? "border-white/20" : "border-slate-200"}`}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`p-1.5 transition-colors ${iconColorClass}`}
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`p-1.5 transition-colors ${iconColorClass}`}
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`p-1.5 transition-colors ${iconColorClass}`}
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
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
