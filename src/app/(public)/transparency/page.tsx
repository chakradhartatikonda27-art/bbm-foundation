export const dynamic = "force-dynamic";

import { FileText, Download, ShieldAlert, Key, CheckCircle, Scale } from "lucide-react";
import prisma from "@/lib/db";

export const metadata = {
  title: "Transparency & Governance",
  description: "Check compliance documents, annual audit reports, registration records, and foundation policy codes.",
};

export default async function TransparencyPage() {
  // Query all compliance documents
  const docs = await prisma.document.findMany({
    orderBy: { publishedYear: "desc" },
  });

  // Split by category
  const policies = docs.filter((d) => d.category === "POLICY");
  const financials = docs.filter((d) => d.category === "FINANCIAL");
  const annuals = docs.filter((d) => d.category === "ANNUAL");
  const legals = docs.filter((d) => d.category === "LEGAL");

  return (
    <div className="bg-brand-bg py-16 sm:py-24 animate-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Trust Strip</span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-primary">
            Governance & Statutory Transparency
          </h1>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            As a serious social-impact organization, BBM Foundation operates under complete compliance codes, reporting audited financial sheets, terms, and safeguards.
          </p>
        </div>

        {/* 1. Legal Registrations Banner */}
        <section className="bg-white border border-border-gray p-8 rounded-2xl shadow-sm space-y-6" aria-labelledby="statutory-heading">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-secondary" />
            <h2 id="statutory-heading" className="text-xl font-bold text-primary font-display">Statutory Registration Data</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="space-y-1">
              <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">Permanent Account Number (PAN)</span>
              <span className="block text-sm font-mono font-bold text-primary">AAFTB3316H</span>
              <span className="block text-[10px] text-slate-500">Formed: 16/11/2023</span>
            </div>
            <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
              <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">Tax Exemption Status</span>
              <span className="block text-sm font-bold text-emerald-600">80G Certified</span>
              <span className="block text-[10px] text-slate-500">Income Tax Dept. Govt of India</span>
            </div>
            <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
              <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">Bank Partner</span>
              <span className="block text-sm font-bold text-primary">Union Bank of India</span>
              <span className="block text-[10px] font-mono text-slate-500">IFSC: UBIN0555142</span>
            </div>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <strong className="block text-emerald-800 font-bold">Verified Statutory Information</strong>
              <p>
                BBM Foundation is officially incorporated under the Income Tax Department Govt. of India with e-PAN Card <span className="font-mono font-bold">AAFTB3316H</span> (Incorporation: 16/11/2023). All contributions directly support charitable and social-impact initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Document Sections Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Document Groups */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Policies Section */}
            <section className="space-y-4" aria-labelledby="policy-heading">
              <h2 id="policy-heading" className="text-lg font-bold text-primary font-display border-b border-slate-100 pb-3 flex items-center gap-2">
                <Key className="w-5 h-5 text-secondary" />
                Operational & Safeguarding Policies
              </h2>
              {policies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {policies.map((p) => (
                    <div key={p.id} className="bg-white p-5 rounded-xl border border-border-gray flex justify-between items-center shadow-sm">
                      <div className="space-y-1">
                        <span className="font-bold text-sm text-primary block">{p.title}</span>
                        <span className="text-[10px] text-slate-400 font-light block">Approved in {p.publishedYear}</span>
                      </div>
                      <a
                        href="#"
                        className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-secondary transition-colors"
                        title="Download [VERIFIED FILE REQUIRED]"
                      >
                        <Download className="w-4 h-4" />
                        <span className="sr-only">Download {p.title}</span>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No policy documents uploaded yet.</p>
              )}
            </section>

            {/* Financial Statements */}
            <section className="space-y-4" aria-labelledby="financial-heading">
              <h2 id="financial-heading" className="text-lg font-bold text-primary font-display border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                Audited Financial Reports
              </h2>
              {financials.length > 0 ? (
                <div className="space-y-3">
                  {financials.map((f) => (
                    <div key={f.id} className="bg-white p-5 rounded-xl border border-border-gray flex justify-between items-center shadow-sm">
                      <div className="space-y-1">
                        <span className="font-bold text-sm text-primary block">{f.title}</span>
                        <span className="text-[10px] text-slate-400 font-light block">Financial Year {f.publishedYear}</span>
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-border-gray hover:border-secondary hover:text-secondary transition-all"
                      >
                        <Download className="w-3 h-3" />
                        Mock File
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-white border border-border-gray rounded-xl text-center space-y-2">
                  <span className="block text-xs font-bold text-primary">No Audited Statements Available</span>
                  <span className="block text-[11px] text-slate-400">Audited accounts will be published annually in this section.</span>
                </div>
              )}
            </section>

            {/* Annual Reports */}
            <section className="space-y-4" aria-labelledby="annual-heading">
              <h2 id="annual-heading" className="text-lg font-bold text-primary font-display border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                Annual Activity Reports
              </h2>
              {annuals.length > 0 ? (
                <div className="space-y-3">
                  {annuals.map((a) => (
                    <div key={a.id} className="bg-white p-5 rounded-xl border border-border-gray flex justify-between items-center shadow-sm">
                      <div className="space-y-1">
                        <span className="font-bold text-sm text-primary block">{a.title}</span>
                        <span className="text-[10px] text-slate-400 font-light block">Published in {a.publishedYear}</span>
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-border-gray hover:border-secondary hover:text-secondary transition-all"
                      >
                        <Download className="w-3 h-3" />
                        Mock File
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No activity reports published yet.</p>
              )}
            </section>

          </div>

          {/* Right Sidebar: Governance Stance */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-primary text-white p-6 sm:p-8 rounded-2xl space-y-4 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-slate-800 rounded-full -mr-10 -mt-10 -z-10"></div>
              <h3 className="font-bold font-display text-amber-500 text-lg">Our Accountability Promise</h3>
              <p className="text-slate-300 text-xs leading-relaxed font-light">
                BBM Foundation is committed to absolute statutory compliance. We coordinate only transparent funding channels, reject manufactured testimonials, and keep records accessible.
              </p>
              <div className="border-t border-slate-800 pt-4 text-[10px] text-slate-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                Board Approved Framework 2026
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border-gray space-y-4 shadow-sm">
              <h3 className="font-bold text-primary text-sm">Need Legal Information?</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                For statutory inquiries, compliance questions, or donor audits, please reach out to our legal department.
              </p>
              <a
                href="mailto:compliance@bbmfoundation.org"
                className="inline-flex text-xs font-bold text-secondary hover:text-primary transition-colors"
              >
                compliance@bbmfoundation.org
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
