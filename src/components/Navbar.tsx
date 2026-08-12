"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Work", href: "/our-work" },
    { name: "Impact", href: "/impact" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Transparency", href: "/transparency" },
    { name: "Contact", href: "/contact" },
  ];

  const isHomepage = pathname === "/";
  const shouldBeTransparent = isHomepage && !isScrolled;

  const linkColorClass = shouldBeTransparent
    ? "text-slate-100 hover:text-amber-accent"
    : "text-primary hover:text-secondary";
  const activeColorClass = shouldBeTransparent
    ? "text-white border-b-2 border-white"
    : "text-secondary border-b-2 border-secondary";
  const logoTextClass = shouldBeTransparent
    ? "text-white group-hover:text-amber-accent"
    : "text-primary group-hover:text-secondary";
  const logoSubtextClass = shouldBeTransparent
    ? "text-amber-accent"
    : "text-secondary";
  const hamburgerClass = shouldBeTransparent
    ? "text-slate-100 hover:text-amber-accent"
    : "text-primary hover:text-secondary";

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          shouldBeTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-border-gray shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex flex-col justify-center">
              <Link href="/" className="group focus:outline-none">
                <span className={`font-display font-extrabold text-xl sm:text-2xl tracking-tight transition-colors ${logoTextClass}`}>
                  BBM FOUNDATION
                </span>
                <span className={`hidden sm:block text-[9px] font-semibold uppercase tracking-widest mt-0.5 transition-colors ${logoSubtextClass}`}>
                  Building Lives • Creating Opportunities • Serving Humanity
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-all py-2 ${
                      isActive ? activeColorClass : linkColorClass
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Header Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold bg-amber-accent text-white hover:bg-secondary transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none"
              >
                <Heart className="w-4 h-4 mr-2 fill-current" />
                Support Our Mission
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${hamburgerClass}`}
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
        navLinks={navLinks}
      />
    </>
  );
}
