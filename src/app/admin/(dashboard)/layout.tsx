import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { decryptSession } from "@/lib/crypto";
import { LayoutDashboard, BookOpen, MessageSquare, Heart, LogOut, Globe, UserCheck, ShieldCheck } from "lucide-react";

async function handleLogout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/admin/login");
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  // Decrypt and verify session
  const session = sessionToken ? decryptSession(sessionToken) : null;

  if (!session) {
    redirect("/admin/login");
  }

  const sidebarLinks = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Programs", href: "/admin/programs", icon: BookOpen },
    { name: "Stories of Change", href: "/admin/stories", icon: Heart },
    { name: "Donations Log", href: "/admin/donations", icon: Heart },
    { name: "Contact Messages", href: "/admin/messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-6">
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="BBM Foundation Logo"
              className="h-10 w-auto object-contain rounded"
            />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg text-white tracking-tight">
                BBM FOUNDATION
              </span>
              <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-widest -mt-0.5">
                CMS Portal Dashboard
              </span>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-secondary flex-shrink-0" />
            <div className="min-w-0">
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">Logged In as</span>
              <span className="block text-xs font-bold text-white truncate">{session.email}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5" aria-label="CMS Management Sections">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-slate-300 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 border-t border-slate-800 pt-6">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            View Public Site
          </Link>
          
          <form action={handleLogout} className="w-full">
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign Out Session
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-800/60 flex items-center justify-between px-8 bg-slate-900/40">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            Role: {session.role.replace("_", " ")}
          </div>
          <div className="text-xs text-slate-400">
            System Local Time: {new Date().toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        {/* Content Shell */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
