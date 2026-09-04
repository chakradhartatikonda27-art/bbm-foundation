"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertTriangle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Submit states
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Force hard refresh to dashboard to update server components session layout
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch (err) {
      setError("Network connection error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>

        {/* Brand */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="BBM Foundation Logo"
            className="h-16 w-auto object-contain mx-auto rounded-lg shadow-md"
          />
          <div>
            <h1 className="font-display font-extrabold text-2xl tracking-tight text-white">Admin Access Portal</h1>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1 block">
              BBM Foundation CMS Gateway
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/25 text-rose-200 rounded-xl p-4 flex items-start gap-3 text-xs leading-normal">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@bbmfoundation.org"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 h-12 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="password" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Portal Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-12 py-3 h-12 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? "Authenticating Session..." : "Authorize Portal Login"}
          </button>
        </form>

        <div className="border-t border-slate-800/60 pt-6 flex items-center justify-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          End-to-End Encrypted Session Channels Only
        </div>
      </div>
    </div>
  );
}
