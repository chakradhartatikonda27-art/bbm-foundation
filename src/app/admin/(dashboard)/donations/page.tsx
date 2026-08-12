export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import { Heart, FileText, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Donation Audit Log | Admin Dashboard",
};

export default async function AdminDonationsPage() {
  // Query all donation logs from SQLite
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Calculate sum of successful donations
  const totalReceived = donations
    .filter((d) => d.status === "SUCCESS")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Donation Audit Log</h1>
          <p className="text-slate-400 text-xs mt-0.5">Read-only transaction ledger for governance transparency auditing.</p>
        </div>
        
        {/* Total stats card */}
        <div className="bg-slate-900 px-5 py-3 rounded-xl border border-slate-800 text-right">
          <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Total Funds Audited</span>
          <span className="block text-base font-extrabold text-amber-500">
            ₹{totalReceived.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {donations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="p-4 sm:p-5">Transaction ID</th>
                  <th className="p-4 sm:p-5">Donor Details</th>
                  <th className="p-4 sm:p-5">Sector Mapping</th>
                  <th className="p-4 sm:p-5">Date</th>
                  <th className="p-4 sm:p-5">Amount</th>
                  <th className="p-4 sm:p-5 text-right">Gateway Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-800/35 transition-colors">
                    <td className="p-4 sm:p-5 font-mono text-[10px] text-slate-400">
                      {d.id.slice(0, 15)}...
                    </td>
                    <td className="p-4 sm:p-5">
                      <strong className="block text-white font-bold">{d.donorName}</strong>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{d.donorEmail}</span>
                      {d.donorPhone && (
                        <span className="block text-[9px] text-slate-500 mt-0.5">{d.donorPhone}</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      {d.purpose}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      {new Date(d.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-4 sm:p-5 text-white font-bold">
                      ₹{d.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className={`inline-block text-[8px] font-bold px-2 py-0.5 rounded uppercase ${
                          d.status === "SUCCESS"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                        }`}>
                          {d.status}
                        </span>
                        {d.paymentId && (
                          <span className="block font-mono text-[8px] text-slate-500">{d.paymentId}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 space-y-2">
            <Heart className="w-12 h-12 text-slate-800 mx-auto" />
            <span className="block text-sm font-bold text-white">No Transactions Logged</span>
            <span className="block text-xs text-slate-500">Every donation processed via the checkout will appear in this ledger.</span>
          </div>
        )}
      </div>
    </div>
  );
}
