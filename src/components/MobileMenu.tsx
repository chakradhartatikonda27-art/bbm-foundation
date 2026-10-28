"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Heart, ChevronDown } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDonate?: () => void;
  navLinks: NavLink[];
}

export default function MobileMenu({ isOpen, onClose, onOpenDonate, navLinks }: MobileMenuProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const resourceDropdownItems = [
    { name: "BBM Roadmap", href: "/resources/roadmap" },
    { name: "Videos", href: "/resources/videos" },
    { name: "For Communities & Churches", href: "/resources/community" },
    { name: "Child Protection Day", href: "/resources/protection-day" },
    { name: "Hope Groups", href: "/resources/hope-groups" },
    { name: "e-Learning", href: "/resources/e-learning" },
  ];

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="font-display font-extrabold text-xl tracking-tight text-[#114227] flex items-center gap-2" onClick={onClose}>
              <img
                src="/logo.png"
                alt="BBM Foundation Logo"
                className="h-10 w-auto object-contain rounded"
              />
              <span>BBM FOUNDATION</span>
            </Link>
            <button
              type="button"
              ref={closeButtonRef}
              onClick={onClose}
              className="rounded-lg p-2.5 text-slate-700 hover:text-emerald-700 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-8 flow-root" aria-label="Mobile Navigation">
            <div className="my-2 divide-y divide-gray-100">
              <div className="space-y-1.5 py-4">
                {navLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href) && link.href !== "/";
                  const isExactHome = pathname === "/" && link.href === "/";
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={onClose}
                      className={`block rounded-xl px-4 py-3 text-base font-semibold leading-7 transition-colors min-h-[44px] touch-manipulation ${
                        isActive || isExactHome ? "text-emerald-800 bg-emerald-50 font-bold" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                {/* Resources Accordion */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors min-h-[44px] touch-manipulation"
                  >
                    <span>Resources</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isResourcesOpen ? "rotate-180 text-emerald-700" : "text-slate-400"}`} />
                  </button>

                  {isResourcesOpen && (
                    <div className="mt-1 pl-4 space-y-1 border-l-2 border-emerald-500/30 ml-4">
                      {resourceDropdownItems.map((item) => {
                        const isSubActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                              isSubActive ? "text-emerald-800 bg-emerald-50 font-bold" : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </nav>
        </div>

        {/* CTA & Connect in Mobile Menu */}
        <div className="border-t border-slate-200 pt-6 space-y-3 mt-6">
          <button
            type="button"
            onClick={() => {
              if (onOpenDonate) onOpenDonate();
              else onClose();
            }}
            className="flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-3.5 text-base font-black text-white shadow-md hover:bg-emerald-700 transition-all min-h-[48px] touch-manipulation"
          >
            <Heart className="w-5 h-5 mr-2 fill-current text-white" />
            Donate Now
          </button>

          {/* WhatsApp Direct Connect */}
          <a
            href="https://wa.me/918500863000?text=Hello%20BBM%20Foundation%2C%20I%20would%20like%20to%20know%20more%20about%20your%20programs."
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20ba5a] px-4 py-3 text-sm font-bold text-white shadow-sm transition-all min-h-[44px] touch-manipulation"
          >
            <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            Chat on WhatsApp
          </a>

          {/* Social Icons row */}
          <div className="flex items-center justify-center gap-4 pt-2 text-slate-500">
            <span className="text-xs font-semibold text-slate-400">Follow Us:</span>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-emerald-700 transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-emerald-700 transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-emerald-700 transition-colors" aria-label="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


