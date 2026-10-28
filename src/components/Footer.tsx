import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  footerInfo?: {
    description?: string;
    regAddress?: string;
    corpAddress?: string;
    phone?: string;
    email?: string;
    copyright?: string;
  };
  branding?: {
    logoUrl?: string;
    siteName?: string;
  };
}

export default function Footer({ footerInfo, branding }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const logoUrl = branding?.logoUrl || "/logo.png";
  const siteName = branding?.siteName || "BBM FOUNDATION";
  const description =
    footerInfo?.description ||
    "A premium social-impact and charitable foundation committed to creating meaningful change through service, opportunity creation, community development, and humanitarian initiatives.";
  const regAddress =
    footerInfo?.regAddress ||
    "# 3-150, Main Street, Bypureddy Palem, Narsipatnam, Anakapalli Dist., A.P. - 531116";
  const corpAddress =
    footerInfo?.corpAddress ||
    "# 4-6-17/1, S1, Kamal's Castle, Savarkar Nagar, Nacharam, Hyd - 500076, Telangana";
  const phone = footerInfo?.phone || "+91 8500863000 / +91 9885126368";
  const email = footerInfo?.email || "bbmindiafoundation@gmail.com";
  const copyright = footerInfo?.copyright || `© ${currentYear} ${siteName}. All Rights Reserved.`;

  return (
    <footer className="bg-white text-slate-600 border-t border-border-gray" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
          
          {/* Column 1: Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 focus:outline-none group">
              <img
                src={logoUrl}
                alt={`${siteName} Logo`}
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105 rounded-md"
              />
              <span className="font-display font-black text-2xl tracking-tight text-primary">
                {siteName}
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-slate-500">
              {description}
            </p>
            <div className="flex flex-col space-y-3.5 text-sm text-slate-500">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-secondary flex-shrink-0 mt-1" />
                <div className="text-xs space-y-1">
                  <div>
                    <strong className="text-slate-700 font-bold block">Reg. Office:</strong>
                    <span>{regAddress}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700 font-bold block">Corp. Office:</strong>
                    <span>{corpAddress}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-secondary flex-shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-secondary font-medium transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-secondary flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-secondary font-medium transition-colors">
                  {email}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider mb-2.5 font-display">
                Connect With Us
              </span>
              <div className="flex items-center space-x-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/918500863000?text=Hello%20BBM%20Foundation%2C%20I%20would%20like%20to%20know%20more%20about%20your%20initiatives."
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-all hover:scale-105 shadow-sm"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-all hover:scale-105 shadow-sm"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-all hover:scale-105 shadow-sm"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-all hover:scale-105 shadow-sm"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-xs font-bold text-secondary uppercase tracking-wider font-display">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  About BBM Foundation
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Impact & Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h3 className="text-xs font-bold text-secondary uppercase tracking-wider font-display">Get Involved</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/donate" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/get-involved?tab=volunteer" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/get-involved?tab=partner" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/get-involved?tab=initiative" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Support an Initiative
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Transparency */}
          <div>
            <h3 className="text-xs font-bold text-secondary uppercase tracking-wider font-display">Transparency</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/transparency" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Governance
                </Link>
              </li>
              <li>
                <Link href="/transparency?tab=reports" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link href="/transparency?tab=financials" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Financial Transparency
                </Link>
              </li>
              <li>
                <Link href="/transparency?tab=compliance" className="text-slate-500 hover:text-secondary transition-colors font-medium">
                  Legal & Compliance
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-border-gray flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div>
            © {currentYear} BBM FOUNDATION. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/transparency?policy=privacy" className="hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/transparency?policy=terms" className="hover:text-secondary transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/transparency?policy=safeguarding" className="hover:text-secondary transition-colors">
              Safeguarding Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
