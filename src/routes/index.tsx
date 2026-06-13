import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  ShieldCheck,
  Megaphone,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Search,
  Award,
  
  Users,
  FileText,
  Clock,
  ChevronRight,
  CalendarDays,
  Building2,
  Download,
  HelpCircle,
  KeyRound,
  Phone,
  Mail,
  MapPin,
  PlayCircle,
  Quote,
  Zap,
} from "lucide-react";
import { GovHeader, GovFooter } from "@/components/portal/GovHeader";
import { latestTenders, latestCorrigendums, tenderResults } from "@/lib/tenderData";
import { useT, useToggleBookmark, useBookmarks } from "@/lib/appStore";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TenderAI · Central Public Procurement Portal — Government of India" },
      {
        name: "description",
        content:
          "India's first AI-powered eProcurement portal. Browse active tenders, corrigendums, results and run instant AI eligibility evaluation under 10 seconds.",
      },
      { property: "og:title", content: "TenderAI · CPPP — Government of India" },
      {
        property: "og:description",
        content: "Browse tenders, corrigendums, and run AI tender evaluation.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const TICKER = [
  "AI Engine v2.4 deployed — eligibility decisions in under 10 seconds.",
  "12,480 evaluations completed across 38 ministries this month.",
  "New: Bulk bidder evaluation enabled for authorized procurement officers.",
  "GFR 2017 compliance rules updated in evaluation matrix.",
  "Helpdesk extended timings during fiscal year-end · 9 AM – 9 PM.",
];

function HomePage() {
  const t = useT();
  const [tab, setTab] = useState<"tenders" | "corrigendum" | "results">("tenders");
  const [bm] = useBookmarks();
  const toggleBm = useToggleBookmark();
  const [quickSearch, setQuickSearch] = useState("");

  const stats = useMemo(
    () => [
      { label: t("activeTenders"), value: "1,284", icon: FileText, tone: "primary" },
      { label: t("closingSoon"), value: "37", icon: Clock, tone: "saffron" },
      { label: t("bidders"), value: "8,762", icon: Users, tone: "green" },
      { label: t("awarded"), value: "₹4,820 Cr", icon: Award, tone: "navy" },
    ],
    [t],
  );

  return (
    <div className="min-h-screen bg-portal-bg">
      <GovHeader />

      {/* Ticker */}
      <div className="bg-[oklch(0.97_0.06_85)] border-b border-portal-border">
        <div className="max-w-[1400px] mx-auto px-4 flex items-stretch">
          <div className="bg-saffron text-white text-[11px] font-bold px-3 flex items-center gap-1.5 shrink-0">
            <Megaphone className="h-3 w-3" /> {t("latest")}
          </div>
          <div className="overflow-hidden flex-1 py-1.5">
            <div className="flex whitespace-nowrap animate-marquee text-[12px] text-foreground">
              {[...TICKER, ...TICKER].map((x, i) => (
                <span key={i} className="px-8">
                  ▸ {x}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main id="main" className="max-w-[1400px] mx-auto px-4 py-5 space-y-6">
        {/* HERO BANNER */}
        <section
          className="relative rounded-lg overflow-hidden border border-portal-border shadow-elevated"
          style={{
            backgroundImage: `linear-gradient(135deg, oklch(0.18 0.06 255 / 0.92), oklch(0.25 0.08 255 / 0.85)), url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-6 sm:px-10 py-8 sm:py-12 grid lg:grid-cols-[1.5fr_1fr] gap-6 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-saffron/90 text-white text-[10px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="h-3 w-3" /> AI Engine v2.4 · Live
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                {t("welcome")}
              </h1>
              <p className="text-white/85 mt-2 text-sm sm:text-base max-w-xl">{t("welcomeDesc")}</p>

              {/* Quick search */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!quickSearch.trim()) {
                    toast.error("Please enter search term");
                    return;
                  }
                  window.location.href = `/search?q=${encodeURIComponent(quickSearch.trim())}`;
                }}
                className="mt-5 flex bg-white rounded-md overflow-hidden shadow-elevated max-w-xl"
              >
                <Search className="h-4 w-4 text-muted-foreground ml-3 self-center shrink-0" />
                <input
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="Search tender by ID, organisation or keyword..."
                  className="flex-1 px-2 py-3 text-sm bg-transparent outline-none text-foreground"
                />
                <button className="px-5 py-3 bg-saffron text-white font-bold text-xs uppercase tracking-wide hover:opacity-90">
                  Search
                </button>
              </form>

              <div className="flex flex-wrap gap-2 mt-4">
                <Link
                  to="/evaluation"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-india-green text-white text-xs font-bold uppercase tracking-wide hover:opacity-90 shadow-card"
                >
                  <Zap className="h-3.5 w-3.5" /> Try AI Evaluation
                </Link>
                <Link
                  to="/tenders"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-wide hover:bg-white/25"
                >
                  <FileText className="h-3.5 w-3.5" /> Browse Tenders
                </Link>
                <button
                  onClick={() => toast.message("Demo video coming soon")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded text-white/90 text-xs font-bold uppercase tracking-wide hover:text-gov-gold"
                >
                  <PlayCircle className="h-4 w-4" /> Watch demo
                </button>
              </div>
            </div>

            {/* Right card: live stats */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-white">
              <div className="text-[10px] uppercase tracking-wider text-white/70 font-semibold mb-3">
                Live Procurement Pulse
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white/10 rounded p-3 border border-white/15">
                    <s.icon className="h-4 w-4 text-gov-gold mb-1" />
                    <div className="text-xl font-bold tabular-nums">{s.value}</div>
                    <div className="text-[10px] text-white/75 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[10px] text-white/70 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-india-green animate-pulse" />
                Updated every 15 minutes
              </div>
            </div>
          </div>
        </section>

        {/* STAT STRIP */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card border border-portal-border rounded p-4 flex items-center gap-3 shadow-card hover:shadow-elevated transition"
            >
              <div className={`h-10 w-10 rounded flex items-center justify-center ${toneBg(s.tone)}`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {s.label}
                </div>
                <div className="text-xl font-bold text-navy tabular-nums">{s.value}</div>
              </div>
            </div>
          ))}
        </section>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* LEFT */}
          <div className="space-y-6 min-w-0">
            {/* Tabbed table */}
            <section className="bg-card border border-portal-border rounded shadow-card overflow-hidden">
              <div className="flex border-b border-portal-border bg-portal-bg">
                {[
                  { k: "tenders", label: t("latestTenders"), icon: FileText, count: latestTenders.length },
                  { k: "corrigendum", label: t("latestCorri"), icon: Megaphone, count: latestCorrigendums.length },
                  { k: "results", label: t("results"), icon: Award, count: tenderResults.length },
                ].map((it) => {
                  const active = tab === it.k;
                  return (
                    <button
                      key={it.k}
                      onClick={() => setTab(it.k as typeof tab)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wide border-b-2 transition ${
                        active
                          ? "border-saffron text-navy bg-card"
                          : "border-transparent text-muted-foreground hover:text-navy"
                      }`}
                    >
                      <it.icon className="h-3.5 w-3.5" />
                      {it.label}
                      <span className="ml-1 px-1.5 py-0.5 rounded-full bg-navy/10 text-navy text-[9px]">
                        {it.count}
                      </span>
                    </button>
                  );
                })}
                <Link
                  to={tab === "tenders" ? "/tenders" : tab === "corrigendum" ? "/corrigendum" : "/results"}
                  className="ml-auto px-4 py-2.5 text-[11px] font-bold text-primary hover:underline self-center flex items-center gap-1"
                >
                  {t("viewAll")} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {tab === "tenders" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-portal-strip text-navy">
                      <tr className="text-left">
                        <Th className="w-8"></Th>
                        <Th>Tender Title</Th>
                        <Th>{t("org")}</Th>
                        <Th>{t("closing")}</Th>
                        <Th>{t("value")}</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-portal-border">
                      {latestTenders.slice(0, 6).map((tt, i) => {
                        const saved = bm.includes(tt.id);
                        return (
                          <tr key={tt.id} className={`${i % 2 ? "bg-portal-bg/30" : ""} hover:bg-saffron/5`}>
                            <td className="px-2 py-2 align-top">
                              <button
                                onClick={() => {
                                  toggleBm(tt.id);
                                  toast.success(saved ? "Removed bookmark" : "Bookmarked");
                                }}
                                className="p-1 rounded hover:bg-portal-bg"
                                title={saved ? "Remove bookmark" : "Bookmark"}
                              >
                                {saved ? (
                                  <BookmarkCheck className="h-3.5 w-3.5 text-saffron" />
                                ) : (
                                  <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                              </button>
                            </td>
                            <td className="px-3 py-2.5 align-top">
                              <Link
                                to="/tenders/$id"
                                params={{ id: tt.id }}
                                className="text-primary hover:underline font-medium block"
                              >
                                {tt.title}
                              </Link>
                              <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                                {tt.ref} · {tt.location}
                              </div>
                            </td>
                            <td className="px-3 py-2.5 align-top text-foreground">{tt.org}</td>
                            <td className="px-3 py-2.5 align-top whitespace-nowrap">
                              <div className="text-foreground">{tt.closing}</div>
                              <Countdown closing={tt.closing} />
                            </td>
                            <td className="px-3 py-2.5 align-top font-mono whitespace-nowrap font-semibold text-navy">
                              {tt.value}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === "corrigendum" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-portal-strip text-navy">
                      <tr className="text-left">
                        <Th>Corrigendum Title</Th>
                        <Th>Reference No</Th>
                        <Th>{t("closing")}</Th>
                        <Th>{t("opening")}</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-portal-border">
                      {latestCorrigendums.map((c, i) => (
                        <tr key={c.ref} className={i % 2 ? "bg-portal-bg/30" : ""}>
                          <td className="px-3 py-2.5 text-primary font-medium">{c.title}</td>
                          <td className="px-3 py-2.5 font-mono whitespace-nowrap">{c.ref}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap">{c.closing}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap">{c.opening}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === "results" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-portal-strip text-navy">
                      <tr className="text-left">
                        <Th>Tender</Th>
                        <Th>Awarded To</Th>
                        <Th>{t("value")}</Th>
                        <Th>Award Date</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-portal-border">
                      {tenderResults.map((r, i) => (
                        <tr key={r.ref} className={i % 2 ? "bg-portal-bg/30" : ""}>
                          <td className="px-3 py-2.5">
                            <div className="text-primary font-medium">{r.title}</div>
                            <div className="font-mono text-[10px] text-muted-foreground">{r.ref}</div>
                          </td>
                          <td className="px-3 py-2.5 text-foreground font-semibold">{r.awarded}</td>
                          <td className="px-3 py-2.5 font-mono font-bold text-india-green">{r.value}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* AI BANNER */}
            <Link
              to="/evaluation"
              className="block relative rounded-lg overflow-hidden border border-portal-border bg-gradient-portal text-white p-5 shadow-card hover:shadow-elevated transition group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-saffron/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="relative flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-lg bg-saffron/20 border border-saffron/40 flex items-center justify-center shrink-0">
                    <Sparkles className="h-7 w-7 text-gov-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gov-gold font-bold">
                      Flagship AI Service
                    </div>
                    <h3 className="font-display text-xl font-bold">AI Tender Evaluation Engine</h3>
                    <p className="text-xs text-white/80 mt-0.5">
                      Upload tender + bidder docs → get explainable eligibility verdict in seconds.
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-saffron text-white text-xs font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                  Open Engine <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>

            {/* Featured ministries */}
            <section className="bg-card border border-portal-border rounded shadow-card overflow-hidden">
              <SectionHeader icon={<Building2 className="h-3.5 w-3.5" />} title="Active Procuring Organisations" />
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  { name: "Ministry of Railways", n: 412 },
                  { name: "Ministry of Defence", n: 298 },
                  { name: "NHAI", n: 187 },
                  { name: "AIIMS", n: 142 },
                  { name: "ISRO", n: 98 },
                  { name: "BSNL", n: 84 },
                  { name: "DRDO", n: 76 },
                  { name: "Ministry of Power", n: 67 },
                ].map((m) => (
                  <Link
                    key={m.name}
                    to="/tenders"
                    className="px-3 py-2.5 rounded border border-portal-border hover:border-saffron hover:bg-saffron/5 transition group"
                  >
                    <div className="text-[11px] font-semibold text-navy group-hover:text-saffron leading-tight">
                      {m.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      <span className="font-bold text-india-green">{m.n}</span> active tenders
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Testimonial */}
            <section className="bg-card border border-portal-border rounded p-5 shadow-card">
              <Quote className="h-6 w-6 text-saffron mb-2" />
              <p className="text-sm text-foreground italic leading-relaxed">
                "TenderAI ne hamari evaluation cycle 18 din se 4 ghante mein la diya hai. Audit trail bhi
                clean rehta hai aur officers ko explainable reasoning milti hai — game changer for GFR
                compliance."
              </p>
              <div className="mt-3 text-xs">
                <div className="font-semibold text-navy">Dr. R. Iyer</div>
                <div className="text-muted-foreground">Chief Procurement Officer, Ministry of Railways</div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-4">
            {/* Quick services */}
            <SidebarCard title="Quick Services" icon={<Zap className="h-3.5 w-3.5" />}>
              <ul className="divide-y divide-portal-border">
                {[
                  { label: "Online Bidder Enrollment", to: "/enrollment" as const, icon: Users },
                  { label: "Generate / Forgot Password", to: "/forgot-password" as const, icon: KeyRound },
                  { label: "Find Nodal Officer", to: "/nodal-officer" as const, icon: MapPin },
                  { label: "Advanced Search", to: "/search" as const, icon: Search },
                  { label: "Download Templates", to: "/downloads" as const, icon: Download },
                  { label: "FAQ", to: "/faq" as const, icon: HelpCircle },
                ].map((q) => (
                  <li key={q.label}>
                    <Link
                      to={q.to}
                      className="flex items-center justify-between px-3 py-2.5 text-xs hover:bg-portal-bg group"
                    >
                      <span className="flex items-center gap-2 text-foreground group-hover:text-primary">
                        <q.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                        {q.label}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarCard>

            {/* Closing today */}
            <SidebarCard title="Closing Soon" icon={<Clock className="h-3.5 w-3.5" />} accent>
              <ul className="p-2 space-y-1.5">
                {latestTenders.slice(0, 3).map((tt) => (
                  <li
                    key={tt.id}
                    className="px-2.5 py-2 rounded border border-portal-border bg-portal-bg/40 hover:bg-saffron/5"
                  >
                    <Link to="/tenders/$id" params={{ id: tt.id }} className="block">
                      <div className="text-[11px] font-semibold text-navy line-clamp-2 leading-tight">
                        {tt.title}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono text-[9px] text-muted-foreground">{tt.ref}</span>
                        <Countdown closing={tt.closing} compact />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarCard>

            {/* Helpdesk */}
            <SidebarCard title={t("helpdesk")} icon={<Phone className="h-3.5 w-3.5" />}>
              <div className="p-3 text-xs space-y-2">
                <div className="text-muted-foreground">24×7 toll-free support:</div>
                <a href="tel:18001234567" className="flex items-center gap-2 font-bold text-navy hover:text-saffron">
                  <Phone className="h-3.5 w-3.5" /> 1800-XXX-XXXX
                </a>
                <a
                  href="mailto:support@tenderai.gov.in"
                  className="flex items-center gap-2 text-foreground hover:text-saffron"
                >
                  <Mail className="h-3.5 w-3.5" /> support@tenderai.gov.in
                </a>
                <Link
                  to="/contact"
                  className="block w-full text-center mt-2 px-3 py-2 rounded bg-navy text-white text-xs font-bold uppercase tracking-wide hover:bg-saffron transition"
                >
                  Raise a Ticket
                </Link>
              </div>
            </SidebarCard>

            {/* Compliance badges */}
            <SidebarCard title="Compliance" icon={<ShieldCheck className="h-3.5 w-3.5" />}>
              <div className="p-3 space-y-1.5 text-[11px]">
                {["GFR 2017 Compliant", "CVC Guidelines", "IT Act 2000", "ISO 27001 Certified"].map((c) => (
                  <div key={c} className="flex items-center gap-2 text-foreground">
                    <ShieldCheck className="h-3 w-3 text-india-green shrink-0" />
                    {c}
                  </div>
                ))}
              </div>
            </SidebarCard>
          </aside>
        </div>

        {/* CERTIFYING AGENCIES */}
        <section className="bg-card border border-portal-border rounded shadow-card overflow-hidden">
          <SectionHeader icon={<ShieldCheck className="h-3.5 w-3.5" />} title="Certifying Agencies (Class III DSC)" />
          <div className="p-5 flex items-center justify-center gap-3 flex-wrap">
            {["(n)Code Solutions", "Sify SafeScrypt", "eMudhra", "IDRBT", "NIC CA", "Capricorn"].map((c) => (
              <button
                key={c}
                onClick={() => toast.message(`${c} — opening agency portal (demo)`)}
                className="flex items-center gap-2 px-4 py-2 rounded border border-portal-border bg-portal-bg text-xs font-semibold text-navy hover:border-saffron hover:bg-saffron/5 transition"
              >
                <ShieldCheck className="h-4 w-4 text-india-green" />
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* IMPORTANT DATES */}
        <section className="bg-card border border-portal-border rounded shadow-card overflow-hidden">
          <SectionHeader icon={<CalendarDays className="h-3.5 w-3.5" />} title="Important Calendar" />
          <div className="grid sm:grid-cols-3 divide-x divide-portal-border">
            {[
              { date: "15", month: "MAY", title: "Pre-bid meeting · NHAI Bypass project", tag: "Meeting" },
              { date: "22", month: "MAY", title: "Closing · CSIR pilot extraction unit", tag: "Closing" },
              { date: "28", month: "MAY", title: "Result publication · UPPCL GIS package", tag: "Result" },
            ].map((d) => (
              <div key={d.title} className="p-4 flex gap-3">
                <div className="h-14 w-14 rounded bg-saffron text-white flex flex-col items-center justify-center shrink-0">
                  <div className="text-xl font-bold leading-none tabular-nums">{d.date}</div>
                  <div className="text-[9px] uppercase tracking-wider">{d.month}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-india-green">{d.tag}</div>
                  <div className="text-xs font-semibold text-navy leading-tight">{d.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <GovFooter />
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function toneBg(tone: string) {
  switch (tone) {
    case "saffron":
      return "bg-saffron";
    case "green":
      return "bg-india-green";
    case "navy":
      return "bg-navy";
    default:
      return "bg-primary";
  }
}

function Th({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <th className={`px-3 py-2 font-bold text-[10px] uppercase tracking-wider border-b border-portal-border ${className}`}>
      {children}
    </th>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="bg-navy text-white px-4 py-2 flex items-center gap-2">
      {icon}
      <h3 className="text-xs font-bold uppercase tracking-wider">{title}</h3>
    </div>
  );
}

function SidebarCard({
  title,
  icon,
  children,
  accent,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="bg-card border border-portal-border rounded shadow-card overflow-hidden">
      <div
        className={`${accent ? "bg-saffron" : "bg-navy"} text-white px-3 py-2 flex items-center gap-1.5`}
      >
        {icon}
        <h3 className="text-xs font-bold uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function parseClosing(s: string): Date | null {
  // "19-May-2026 10:00 AM"
  const m = s.match(/(\d{1,2})-(\w{3})-(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  let h = parseInt(m[4], 10);
  if (/PM/i.test(m[6]) && h !== 12) h += 12;
  if (/AM/i.test(m[6]) && h === 12) h = 0;
  return new Date(parseInt(m[3]), months[m[2]] ?? 0, parseInt(m[1]), h, parseInt(m[5]));
}

function Countdown({ closing, compact }: { closing: string; compact?: boolean }) {
  const target = parseClosing(closing);
  if (!target) return null;
  const ms = target.getTime() - Date.now();
  if (ms <= 0)
    return (
      <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-destructive/15 text-destructive">
        CLOSED
      </span>
    );
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const urgent = days < 5;
  const cls = urgent
    ? "bg-saffron/20 text-[oklch(0.45_0.18_55)] border border-saffron/40"
    : "bg-india-green/15 text-india-green border border-india-green/30";
  return (
    <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded ${cls} mt-0.5`}>
      {compact ? `${days}d ${hours}h` : `Closes in ${days}d ${hours}h`}
    </span>
  );
}
