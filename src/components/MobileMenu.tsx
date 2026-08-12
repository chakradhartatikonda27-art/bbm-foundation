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
  navLinks: NavLink[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
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
      // Prevent body scroll when open
      document.body.style.overflow = "hidden";
      // Focus the close button when opened
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
            <Link href="/" className="font-display font-extrabold text-xl tracking-tight text-primary" onClick={onClose}>
              BBM FOUNDATION
            </Link>
            <button
              type="button"
              ref={closeButtonRef}
              onClick={onClose}
              className="rounded-md p-2 text-primary hover:text-secondary focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-8 flow-root" aria-label="Mobile Navigation">
            <div className="my-2 divide-y divide-gray-100">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={onClose}
                      className={`block rounded-lg px-3 py-3 text-base font-semibold leading-7 transition-colors hover:bg-slate-50 hover:text-secondary ${
                        isActive ? "text-secondary bg-slate-50" : "text-primary"
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
        <div className="border-t border-border-gray pt-6">
          <Link
            href="/donate"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-full bg-amber-accent px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-secondary hover:shadow-lg transition-all duration-200"
          >
            <Heart className="w-5 h-5 mr-2 fill-current text-white" />
            Support Our Mission
          </Link>
        </div>
      </div>
    </div>
  );
}
