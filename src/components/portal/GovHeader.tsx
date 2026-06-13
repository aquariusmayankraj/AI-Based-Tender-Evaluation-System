import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  Search,
  LogIn,
  UserPlus,
  Bell,
  Sun,
  Moon,
  Languages,
  ChevronDown,
  LogOut,
  Bookmark,
  ShieldCheck,
  X,
  Menu,
  ArrowUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  useLang,
  useFontScale,
  useTheme,
  useUser,
  useNotifs,
  useT,
  useApplyGlobalPrefs,
  useBookmarks,
} from "@/lib/appStore";
import { LoginDialog } from "./LoginDialog";
import emblem from "@/assets/emblem.png";

const NAV = [
  { key: "home", to: "/" as const },
  { key: "tenders", to: "/tenders" as const },
  { key: "corrigendum", to: "/corrigendum" as const },
  { key: "results", to: "/results" as const },
  { key: "evaluation", to: "/evaluation" as const },
  { key: "reports", to: "/reports" as const },
  { key: "downloads", to: "/downloads" as const },
  { key: "help", to: "/help" as const },
  { key: "contact", to: "/contact" as const },
] as const;

export function GovHeader() {
  useApplyGlobalPrefs();
  const t = useT();
  const navigate = useNavigate();
  const [lang, setLang] = useLang();
  const [font, setFont] = useFontScale();
  const [theme, setTheme] = useTheme();
  const [user, setUser] = useUser();
  const [notifs, setNotifs] = useNotifs();
  const [bm] = useBookmarks();
  const [openLogin, setOpenLogin] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [q, setQ] = useState("");
  const [time, setTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setOpenNotif(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setOpenUser(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unread = notifs.filter((n) => !n.read).length;
  const dateStr = time.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = time.toLocaleTimeString("en-IN", { hour12: false });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    navigate({ to: "/search", search: { q: q.trim() } });
  }

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-[oklch(0.18_0.05_255)] text-white text-[11px]">
        <div className="h-[3px] bg-tricolor" />
        <div className="max-w-[1400px] mx-auto px-4 py-1.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-semibold truncate">{t("govOfIndia")}</span>
            <span className="opacity-40 hidden sm:inline">|</span>
            <span className="opacity-90 truncate hidden sm:inline">{t("ministry")}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline tabular-nums opacity-90">
              {dateStr} · {timeStr} IST
            </span>
            <a href="#main" className="hidden md:inline hover:text-gov-gold">
              {t("skipMain")}
            </a>
            <span className="opacity-40 hidden md:inline">|</span>
            {/* Font size */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setFont(Math.max(85, font - 5))}
                title="Decrease font"
                className="px-1.5 hover:text-gov-gold"
              >
                A-
              </button>
              <button onClick={() => setFont(100)} title="Reset" className="px-1.5 hover:text-gov-gold">
                A
              </button>
              <button
                onClick={() => setFont(Math.min(125, font + 5))}
                title="Increase font"
                className="px-1.5 hover:text-gov-gold"
              >
                A+
              </button>
            </div>
            <span className="opacity-40">|</span>
            {/* Lang */}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1 hover:text-gov-gold"
              title="Toggle language"
            >
              <Languages className="h-3 w-3" />
              {lang === "en" ? "हिंदी" : "EN"}
            </button>
            <span className="opacity-40">|</span>
            {/* Theme */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hover:text-gov-gold"
              title="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main header band */}
      <div className="bg-card border-b-2 border-saffron/60">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src={emblem}
              alt="Government of India emblem"
              width={56}
              height={56}
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain group-hover:scale-105 transition"
            />
            <div className="min-w-0">
              <div className="font-display text-lg sm:text-xl font-bold text-navy leading-tight">
                Tender<span className="text-saffron">AI</span>
                <span className="text-foreground/60 font-normal text-sm sm:text-base ml-1">
                  · eProcurement
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Central Public Procurement Portal · Govt. of India
              </div>
            </div>
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4 items-center bg-portal-bg border border-portal-border rounded overflow-hidden focus-within:ring-2 focus-within:ring-primary"
          >
            <Search className="h-4 w-4 text-muted-foreground ml-3 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search")}
              className="flex-1 px-2 py-2 text-sm bg-transparent outline-none text-foreground"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-navy text-white text-xs font-bold uppercase hover:bg-primary"
            >
              Go
            </button>
          </form>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setOpenNotif((v) => !v)}
                className="relative p-2 rounded hover:bg-portal-bg border border-transparent hover:border-portal-border"
                title="Notifications"
              >
                <Bell className="h-4 w-4 text-navy" />
                {unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-saffron text-white text-[9px] font-bold flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>
              {openNotif && (
                <div className="absolute right-0 top-full mt-1 w-80 bg-card border border-portal-border rounded shadow-elevated z-50 overflow-hidden">
                  <div className="bg-navy text-white px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wide">Notifications</span>
                    <button
                      onClick={() => {
                        setNotifs(notifs.map((n) => ({ ...n, read: true })));
                        toast.success("All marked as read");
                      }}
                      className="text-[10px] hover:text-gov-gold"
                    >
                      Mark all read
                    </button>
                  </div>
                  <ul className="max-h-72 overflow-auto divide-y divide-portal-border">
                    {notifs.map((n) => (
                      <li
                        key={n.id}
                        onClick={() => setNotifs(notifs.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                        className={`px-3 py-2 text-xs cursor-pointer hover:bg-portal-bg ${
                          !n.read ? "bg-portal-bg/60 font-semibold" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {!n.read && <span className="h-2 w-2 rounded-full bg-saffron mt-1 shrink-0" />}
                          <div className="flex-1">
                            <div className="text-foreground">{n.title}</div>
                            <div className="text-muted-foreground text-[10px] mt-0.5">{n.time}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bookmarks badge */}
            <Link
              to="/tenders"
              className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded text-xs text-navy hover:bg-portal-bg border border-transparent hover:border-portal-border"
              title="My bookmarks"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span className="font-bold">{bm.length}</span>
            </Link>

            {user ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setOpenUser((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded bg-portal-bg border border-portal-border text-xs"
                >
                  <div className="h-6 w-6 rounded-full bg-navy text-white flex items-center justify-center font-bold text-[10px]">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-semibold text-navy">{user.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                {openUser && (
                  <div className="absolute right-0 top-full mt-1 w-56 bg-card border border-portal-border rounded shadow-elevated z-50 overflow-hidden">
                    <div className="px-3 py-2 bg-portal-bg border-b border-portal-border">
                      <div className="text-xs font-bold text-navy">{user.name}</div>
                      <div className="text-[10px] text-muted-foreground">{user.role}</div>
                    </div>
                    <Link
                      to="/evaluation"
                      onClick={() => setOpenUser(false)}
                      className="block px-3 py-2 text-xs hover:bg-portal-bg"
                    >
                      My Evaluations
                    </Link>
                    <Link
                      to="/enrollment"
                      onClick={() => setOpenUser(false)}
                      className="block px-3 py-2 text-xs hover:bg-portal-bg"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        setUser(null);
                        setOpenUser(false);
                        toast.success("Logged out");
                      }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-destructive/10 text-destructive flex items-center gap-2 border-t border-portal-border"
                    >
                      <LogOut className="h-3 w-3" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setOpenLogin(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-navy text-navy text-xs font-bold hover:bg-navy hover:text-white transition"
                >
                  <LogIn className="h-3.5 w-3.5" /> {t("login")}
                </button>
                <Link
                  to="/enrollment"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-saffron text-white text-xs font-bold hover:opacity-90 shadow-card"
                >
                  <UserPlus className="h-3.5 w-3.5" /> {t("register")}
                </Link>
              </>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setOpenMobile((v) => !v)}
              className="lg:hidden p-2 rounded border border-portal-border"
            >
              {openMobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Nav strip */}
        <nav className="bg-navy border-t border-saffron/40">
          <div className="max-w-[1400px] mx-auto px-2 hidden lg:flex">
            {NAV.map((it) => (
              <Link
                key={it.key}
                to={it.to}
                activeOptions={{ exact: it.to === "/" }}
                activeProps={{ className: "bg-saffron text-white" }}
                inactiveProps={{ className: "text-white/85 hover:bg-white/10 hover:text-white" }}
                className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide whitespace-nowrap transition-colors"
              >
                {t(it.key as never)}
              </Link>
            ))}
            <div className="ml-auto flex items-center gap-3 px-4 text-[10px] text-white/70">
              <a href="tel:18001234567" className="flex items-center gap-1 hover:text-gov-gold">
                <Phone className="h-3 w-3" /> 1800-XXX-XXXX
              </a>
              <a href="mailto:support@tenderai.gov.in" className="flex items-center gap-1 hover:text-gov-gold">
                <Mail className="h-3 w-3" /> support@tenderai.gov.in
              </a>
            </div>
          </div>

          {openMobile && (
            <div className="lg:hidden bg-navy border-t border-white/10">
              {NAV.map((it) => (
                <Link
                  key={it.key}
                  to={it.to}
                  onClick={() => setOpenMobile(false)}
                  className="block px-4 py-2.5 text-xs font-semibold text-white border-b border-white/10 hover:bg-white/10"
                >
                  {t(it.key as never)}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </div>

      <LoginDialog open={openLogin} onClose={() => setOpenLogin(false)} />

      {/* Scroll to top */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full bg-navy text-white shadow-elevated flex items-center justify-center hover:bg-saffron transition"
          title="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}

export function GovFooter() {
  return (
    <footer className="bg-[oklch(0.18_0.05_255)] text-white/85 mt-10">
      <div className="h-1 bg-tricolor" />
      <div className="max-w-[1400px] mx-auto px-4 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-gov-gold" />
            <h4 className="font-display font-bold text-white text-sm">TenderAI</h4>
          </div>
          <p className="leading-relaxed text-white/70">
            Central Public Procurement Portal of the Government of India, powered by explainable AI.
          </p>
        </div>
        <FooterCol
          title="Quick Links"
          items={[
            { label: "Active Tenders", to: "/tenders" },
            { label: "Tender Results", to: "/results" },
            { label: "Corrigendum", to: "/corrigendum" },
            { label: "Downloads", to: "/downloads" },
          ]}
        />
        <FooterCol
          title="Support"
          items={[
            { label: "Help & FAQ", to: "/faq" },
            { label: "Nodal Officer", to: "/nodal-officer" },
            { label: "Contact Us", to: "/contact" },
            { label: "Sitemap", to: "/sitemap" },
          ]}
        />
        <div>
          <h4 className="font-bold text-white text-sm mb-2 uppercase tracking-wide">Helpdesk</h4>
          <div className="space-y-1 text-white/70">
            <div>☎ 1800-XXX-XXXX</div>
            <div>✉ support@tenderai.gov.in</div>
            <div>Mon–Sat · 9 AM – 6 PM IST</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/60">
          <div>© 2026 TenderAI · Government of India · Ministry of Procurement & AI Evaluation</div>
          <div className="flex gap-3">
            <Link to="/help" className="hover:text-gov-gold">Privacy</Link>
            <Link to="/help" className="hover:text-gov-gold">Terms</Link>
            <Link to="/help" className="hover:text-gov-gold">Accessibility</Link>
            <Link to="/sitemap" className="hover:text-gov-gold">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { LinkProps } from "@tanstack/react-router";
function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: LinkProps["to"] }[];
}) {
  return (
    <div>
      <h4 className="font-bold text-white text-sm mb-2 uppercase tracking-wide">{title}</h4>
      <ul className="space-y-1 text-white/70">
        {items.map((it) => (
          <li key={it.label}>
            <Link to={it.to} className="hover:text-gov-gold">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
