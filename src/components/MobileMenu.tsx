"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Heart } from "lucide-react";

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
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-2xl flex flex-col justify-between transition-transform duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="font-display font-extrabold text-xl tracking-tight text-[#114227]" onClick={onClose}>
              BBM FOUNDATION
            </Link>
            <button
              type="button"
              ref={closeButtonRef}
              onClick={onClose}
              className="rounded-md p-2 text-slate-700 hover:text-emerald-700 focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-8 flow-root" aria-label="Mobile Navigation">
            <div className="my-2 divide-y divide-gray-100">
              <div className="space-y-2 py-4">
                {navLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={onClose}
                      className={`block rounded-lg px-3 py-3 text-base font-semibold leading-7 transition-colors hover:bg-emerald-50 hover:text-emerald-800 ${
                        isActive ? "text-emerald-800 bg-emerald-50 font-bold" : "text-slate-700"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* CTA in Mobile Menu */}
        <div className="border-t border-slate-200 pt-6 space-y-3">
          <button
            type="button"
            onClick={() => {
              if (onOpenDonate) onOpenDonate();
              else onClose();
            }}
            className="flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-3.5 text-base font-black text-white shadow-md hover:bg-emerald-700 transition-all"
          >
            <Heart className="w-5 h-5 mr-2 fill-current text-white" />
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}

