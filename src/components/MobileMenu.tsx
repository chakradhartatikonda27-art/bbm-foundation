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

        {/* CTA in Mobile Menu */}
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
        </div>
      </div>
    </div>
  );
}


