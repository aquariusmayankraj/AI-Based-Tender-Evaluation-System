import { useEffect, useState, useCallback } from "react";

/* ---------------- Tiny pub-sub store ---------------- */
type Listener = () => void;
function createStore<T>(initial: T, key?: string) {
  let state = initial;
  if (key && typeof localStorage !== "undefined") {
    try {
      const raw = localStorage.getItem(key);
      if (raw) state = JSON.parse(raw);
    } catch {}
  }
  const listeners = new Set<Listener>();
  return {
    get: () => state,
    set: (next: T | ((prev: T) => T)) => {
      state = typeof next === "function" ? (next as (p: T) => T)(state) : next;
      if (key && typeof localStorage !== "undefined") {
        try {
          localStorage.setItem(key, JSON.stringify(state));
        } catch {}
      }
      listeners.forEach((l) => l());
    },
    sub: (l: Listener) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

function useStore<T>(store: ReturnType<typeof createStore<T>>): [T, (v: T | ((p: T) => T)) => void] {
  const [, force] = useState(0);
  useEffect(() => {
    const unsub = store.sub(() => force((x) => x + 1));
    return () => {
      unsub();
    };
  }, [store]);
  return [store.get(), store.set];
}

/* ---------------- Stores ---------------- */
export type Lang = "en" | "hi";
const langStore = createStore<Lang>("en", "tai_lang");
const fontStore = createStore<number>(100, "tai_font");
const themeStore = createStore<"light" | "dark">("light", "tai_theme");
const bookmarksStore = createStore<string[]>([], "tai_bookmarks");
const userStore = createStore<{ name: string; role: string } | null>(null, "tai_user");
const notifStore = createStore<{ id: string; title: string; time: string; read: boolean }[]>(
  [
    { id: "n1", title: "Tender T-2026-0421 closing in 3 days", time: "2h ago", read: false },
    { id: "n2", title: "AI Engine v2.4 deployed — 99.2% accuracy", time: "1d ago", read: false },
    { id: "n3", title: "New corrigendum on NHAI/PIU-NGP/2026/12", time: "2d ago", read: true },
  ],
  "tai_notifs",
);

/* ---------------- Hooks ---------------- */
export const useLang = () => useStore(langStore);
export const useFontScale = () => useStore(fontStore);
export const useTheme = () => useStore(themeStore);
export const useBookmarks = () => useStore(bookmarksStore);
export const useUser = () => useStore(userStore);
export const useNotifs = () => useStore(notifStore);

export function useToggleBookmark() {
  const [bm, setBm] = useBookmarks();
  return useCallback(
    (id: string) => {
      setBm((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    },
    [setBm],
  );
}

/* ---------------- i18n ---------------- */
const dict: Record<string, { en: string; hi: string }> = {
  govOfIndia: { en: "Government of India", hi: "भारत सरकार" },
  ministry: { en: "Ministry of Procurement & AI Evaluation", hi: "खरीद एवं एआई मूल्यांकन मंत्रालय" },
  skipMain: { en: "Skip to Main Content", hi: "मुख्य सामग्री पर जाएँ" },
  home: { en: "Home", hi: "होम" },
  tenders: { en: "Tenders", hi: "निविदाएँ" },
  corrigendum: { en: "Corrigendum", hi: "शुद्धिपत्र" },
  results: { en: "Tender Results", hi: "निविदा परिणाम" },
  evaluation: { en: "AI Evaluation", hi: "एआई मूल्यांकन" },
  reports: { en: "Reports", hi: "रिपोर्ट" },
  downloads: { en: "Downloads", hi: "डाउनलोड" },
  help: { en: "Help", hi: "सहायता" },
  contact: { en: "Contact", hi: "संपर्क" },
  search: { en: "Search tenders, bidders, organisations...", hi: "निविदा, बोलीदाता खोजें..." },
  login: { en: "Login", hi: "लॉगिन" },
  register: { en: "Register", hi: "पंजीकरण" },
  logout: { en: "Logout", hi: "लॉगआउट" },
  helpdesk: { en: "Helpdesk", hi: "हेल्पडेस्क" },
  latest: { en: "LATEST", hi: "ताज़ा" },
  welcome: { en: "Welcome to TenderAI", hi: "टेंडरएआई में आपका स्वागत है" },
  welcomeDesc: {
    en: "India's first AI-powered eProcurement platform. Browse tenders, evaluate bids and award contracts with explainable AI — under 10 seconds.",
    hi: "भारत का पहला एआई आधारित ई-निविदा प्लेटफ़ॉर्म।",
  },
  activeTenders: { en: "Active Tenders", hi: "सक्रिय निविदाएँ" },
  closingSoon: { en: "Closing Today", hi: "आज बंद हो रही" },
  bidders: { en: "Registered Bidders", hi: "पंजीकृत बोलीदाता" },
  awarded: { en: "Contracts Awarded", hi: "अनुबंध दिए गए" },
  latestTenders: { en: "Latest Tenders", hi: "नवीनतम निविदाएँ" },
  latestCorri: { en: "Latest Corrigendums", hi: "नवीनतम शुद्धिपत्र" },
  viewAll: { en: "View All", hi: "सभी देखें" },
  closing: { en: "Closing", hi: "बंद होने की तिथि" },
  opening: { en: "Opening", hi: "खुलने की तिथि" },
  value: { en: "Value", hi: "मूल्य" },
  org: { en: "Organisation", hi: "संगठन" },
};
export function useT() {
  const [lang] = useLang();
  return useCallback((k: keyof typeof dict) => dict[k]?.[lang] ?? k, [lang]);
}

/* ---------------- Apply theme & font globally ---------------- */
export function useApplyGlobalPrefs() {
  const [font] = useFontScale();
  const [theme] = useTheme();
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.fontSize = font + "%";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [font, theme]);
}
