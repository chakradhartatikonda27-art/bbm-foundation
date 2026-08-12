export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import { BookOpen, Heart, MessageSquare, Plus, Mail, Phone, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // Query aggregates from database
  const programCount = await prisma.program.count();
  const storyCount = await prisma.story.count();
  const donationCount = await prisma.donation.count();
  const messageCount = await prisma.contactMessage.count();

  // Query recent records
  const recentMessages = await prisma.contactMessage.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const recentDonations = await prisma.donation.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const cards = [
    { name: "Active Programs", count: programCount, icon: BookOpen, href: "/admin/programs" },
    { name: "Stories of Change", count: storyCount, icon: Heart, href: "/admin/stories" },
    { name: "Audit Donation Records", count: donationCount, icon: Heart, href: "/admin/donations" },
    { name: "Inbound Messages", count: messageCount, icon: MessageSquare, href: "/admin/messages" },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">System Overview</h1>
          <p className="text-slate-400 text-xs mt-1">
            Real-time analytics and management modules for BBM Foundation database models.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/programs?action=new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Program
          </Link>
          <Link
            href="/admin/stories?action=new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Publish Story
          </Link>
        </div>
      </div>

      {/* Aggregate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.name}
              href={card.href}
              className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-all shadow-sm hover:shadow-md group"
            >
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">{card.name}</span>
                <span className="block text-2xl font-extrabold text-white group-hover:text-amber-500 transition-colors">
                  {card.count}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/60 text-amber-500">
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Grid: Messages & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Contact Messages */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white font-display">Recent Contact Messages</h2>
            <Link href="/admin/messages" className="text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:text-white transition-colors flex items-center gap-1">
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMessages.length > 0 ? (
            <div className="space-y-4">
              {recentMessages.map((m) => (
                <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800/40 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <strong className="block text-xs text-white truncate">{m.name}</strong>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{m.purpose}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 whitespace-nowrap">
                      {new Date(m.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-light line-clamp-2">{m.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-slate-500">No contact messages received.</div>
          )}
        </div>

        {/* Recent Donations */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white font-display">Recent Contributions</h2>
            <Link href="/admin/donations" className="text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:text-white transition-colors flex items-center gap-1">
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentDonations.length > 0 ? (
            <div className="space-y-3.5">
              {recentDonations.map((d) => (
                <div key={d.id} className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800/40 text-xs">
                  <div className="min-w-0">
                    <strong className="block text-white truncate">{d.donorName}</strong>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{d.purpose}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-slate-100 font-bold">₹{d.amount.toLocaleString("en-IN")}</span>
                    <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded uppercase mt-0.5 ${
                      d.status === "SUCCESS"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                    }`}>
                      {d.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-slate-500">No donation transactions logged.</div>
          )}
        </div>

      </div>
    </div>
  );
}
