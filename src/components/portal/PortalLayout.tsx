import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Home,
  Mail,
  Map,
  Search,
  FileText,
  Calendar,
  AlertCircle,
  Award,
  Eye,
  ShieldCheck,
  LogIn,
  UserPlus,
  KeyRound,
  UserSearch,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { LoginDialog } from "./LoginDialog";

const sidebarLinks = [
  { label: "MIS Reports", to: "/reports" },
  { label: "Tenders by Location", to: "/tenders?by=location" },
  { label: "Tenders by Organisation", to: "/tenders?by=org" },
  { label: "Tenders by Classification", to: "/tenders?by=class" },
  { label: "Tenders in Archive", to: "/tenders?by=archive" },
  { label: "Tenders Status", to: "/tenders?by=status" },
  { label: "Cancelled / Retendered", to: "/tenders?by=cancelled" },
  { label: "Downloads", to: "/downloads" },
  { label: "Debarment List", to: "/debarment" },
  { label: "Announcements", to: "/announcements" },
  { label: "Awards", to: "/results" },
  { label: "Site Compatibility", to: "/help" },
];

const topNav = [
  { label: "Search", to: "/search", icon: Search },
  { label: "Active Tenders", to: "/tenders", icon: FileText },
  { label: "Tenders by Closing Date", to: "/tenders?sort=closing", icon: Calendar },
  { label: "Corrigendum", to: "/corrigendum", icon: AlertCircle },
  { label: "Results of Tenders", to: "/results", icon: Award },
  { label: "AI Evaluation", to: "/evaluation", icon: Sparkles },
];

export function PortalLayout({ children }: { children: ReactNode }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-portal-bg flex flex-col">
      {/* Top utility */}
      <div className="bg-navy text-white text-[11px] px-3 py-1 flex items-center justify-between">
        <span>भारत सरकार | Government of India</span>
        <Link
          to="/help"
          className="hover:underline"
          aria-label="Screen Reader Access"
        >
          Screen Reader Access
        </Link>
      </div>

      {/* Tricolor strip */}
      <div className="h-1 bg-tricolor" />

      {/* Banner */}
      <div className="bg-gradient-portal text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex items-center gap-4">
          <div className="h-14 w-14 rounded bg-white/10 backdrop-blur flex items-center justify-center shrink-0 border border-white/20">
            <ShieldCheck className="h-9 w-9 text-gov-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/70">
              AI Tender Evaluation System
            </div>
            <h1 className="font-display text-lg sm:text-2xl font-bold leading-tight truncate">
              TenderAI — Intelligent Procurement Platform
            </h1>
            <div className="text-[11px] sm:text-xs text-white/80">
              AI-powered tender evaluation for Central Public Sector Enterprises
            </div>
          </div>
          <button
            onClick={() => setMobileNav((v) => !v)}
            className="lg:hidden p-2 rounded hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Date + nav strip */}
      <div className="bg-portal-strip border-b border-portal-border">
        <div className="max-w-[1280px] mx-auto px-4 py-2 flex items-center justify-between gap-3 text-sm">
          <div className="text-portal-strip-fg font-semibold">{today}</div>
          <nav
            className={`${
              mobileNav ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row absolute lg:static top-[120px] right-2 lg:top-auto bg-portal-strip lg:bg-transparent border lg:border-0 border-portal-border rounded shadow-elevated lg:shadow-none p-2 lg:p-0 gap-0 lg:gap-1 z-30`}
          >
            {topNav.map((n) => {
              const active = path === n.to.split("?")[0];
              return (
                <Link
                  key={n.label}
                  to={n.to.split("?")[0]}
                  search={
                    n.to.includes("?")
                      ? Object.fromEntries(new URLSearchParams(n.to.split("?")[1]))
                      : undefined
                  }
                  onClick={() => setMobileNav(false)}
                  className={`px-2.5 py-1.5 text-xs lg:text-[12.5px] flex items-center gap-1.5 rounded transition-colors whitespace-nowrap ${
                    active
                      ? "bg-navy text-white"
                      : "text-portal-strip-fg hover:bg-navy/10 hover:text-navy"
                  }`}
                >
                  <n.icon className="h-3.5 w-3.5" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <IconBtn to="/" label="Home" Icon={Home} />
            <IconBtn to="/contact" label="Contact" Icon={Mail} />
            <IconBtn to="/sitemap" label="Sitemap" Icon={Map} />
          </div>
        </div>
      </div>

      {/* Body grid */}
      <main className="flex-1">
        <div className="max-w-[1280px] mx-auto px-3 py-4 grid lg:grid-cols-[210px_1fr_260px] gap-4">
          {/* Left sidebar buttons */}
          <aside className="space-y-1.5">
            {sidebarLinks.map((s) => (
              <Link
                key={s.label}
                to={s.to.split("?")[0]}
                search={
                  s.to.includes("?")
                    ? Object.fromEntries(new URLSearchParams(s.to.split("?")[1]))
                    : undefined
                }
                className="block w-full text-center px-3 py-2.5 rounded bg-portal-btn border border-portal-border text-[12.5px] font-semibold text-navy hover:bg-navy hover:text-white hover:border-navy shadow-card transition-all"
              >
                {s.label}
              </Link>
            ))}
            <div className="pt-3 space-y-2">
              <BadgeBtn to="https://www.gem.gov.in" label="GeM" />
              <BadgeBtn to="https://www.india.gov.in" label="india.gov.in" />
              <BadgeBtn to="https://eprocure.gov.in" label="CPPP Portal" />
            </div>
          </aside>

          {/* Center content */}
          <section className="min-w-0 space-y-4">{children}</section>

          {/* Right rail */}
          <aside className="space-y-3">
            <button
              onClick={() => setLoginOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-gradient-hero text-white font-bold text-sm shadow-glow hover:shadow-elevated transition"
            >
              <LogIn className="h-4 w-4" />
              Click here to Login
            </button>

            <RailLink to="/enrollment" Icon={UserPlus} label="Online Bidder Enrollment" />
            <RailLink to="/forgot-password" Icon={KeyRound} label="Generate / Forgot Password?" />
            <RailLink to="/nodal-officer" Icon={UserSearch} label="Find My Nodal Officer" />

            <div className="bg-card border border-portal-border rounded p-3 shadow-card">
              <div className="text-xs font-semibold text-navy mb-2">
                Search with ID / Title / Reference no
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const q = String(fd.get("q") || "");
                  window.location.href = `/search?q=${encodeURIComponent(q)}`;
                }}
                className="flex gap-1"
              >
                <input
                  name="q"
                  className="flex-1 px-2 py-1.5 text-xs border border-portal-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. NHAI/2026/12"
                />
                <button className="px-3 py-1.5 text-xs font-semibold bg-navy text-white rounded hover:opacity-90">
                  Go
                </button>
              </form>
              <Link
                to="/search"
                className="block mt-2 text-xs text-primary hover:underline font-semibold"
              >
                Advanced Search →
              </Link>
            </div>

            <div className="bg-card border border-portal-border rounded shadow-card divide-y divide-portal-border text-xs">
              {[
                { to: "/help", label: "Help For Contractors" },
                { to: "/help", label: "Information About DSC" },
                { to: "/help", label: "Guidelines for Hassle Free Bid Submission" },
                { to: "/faq", label: "FAQ" },
                { to: "/contact", label: "Feedback" },
                { to: "/help", label: "Bidders Manual Kit" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="block px-3 py-2 text-navy hover:bg-portal-strip transition"
                >
                  • {l.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white/85 text-xs">
        <div className="max-w-[1280px] mx-auto px-4 py-3 text-center border-b border-white/10">
          <strong className="text-white">Visitor No: 1,00,70,583</strong>
        </div>
        <div className="max-w-[1280px] mx-auto px-4 py-3 text-center">
          Contents owned and maintained by concerned Departments in coordination with Finance &
          IT Department, Government of India.
        </div>
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10">
          <div>Designed, Developed and Hosted by National Informatics Centre</div>
          <div>Version 1.09.23 · © 2026 Tenders NIC. All rights reserved.</div>
        </div>
      </footer>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}

function IconBtn({
  to,
  label,
  Icon,
}: {
  to: string;
  label: string;
  Icon: typeof Home;
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 px-2 py-1 rounded text-portal-strip-fg hover:bg-navy hover:text-white transition text-xs font-semibold"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Link>
  );
}

function RailLink({
  to,
  label,
  Icon,
}: {
  to: string;
  label: string;
  Icon: typeof Home;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2.5 rounded bg-card border border-portal-border text-sm font-semibold text-navy hover:bg-navy hover:text-white hover:border-navy transition shadow-card"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function BadgeBtn({ to, label }: { to: string; label: string }) {
  return (
    <a
      href={to}
      target="_blank"
      rel="noreferrer"
      className="block px-3 py-2 rounded bg-white border border-portal-border text-center text-[11px] font-bold text-navy hover:shadow-elevated transition"
    >
      {label} ↗
    </a>
  );
}
