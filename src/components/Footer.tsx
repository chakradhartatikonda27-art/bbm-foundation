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
