import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { content, SERVER_IP, type Locale, type SiteContent } from "../content";

interface SiteContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: SiteContent;
  copyIp: () => void;
  toastVisible: boolean;
  mobileOpen: boolean;
  toggleMobile: () => void;
  closeMobile: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const LANG_STORAGE_KEY = "mythoris_lang";

function detectLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "pl" || saved === "en") return saved;
  } catch {
    // localStorage unavailable — fall through to browser language
  }
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("pl") ? "pl" : "en";
}

function fallbackCopy(text: string, onDone: () => void) {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    onDone();
  } catch {
    // clipboard truly unavailable — nothing more we can do
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pl");
  const [toastVisible, setToastVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // ignore write failures (private browsing, etc.)
    }
  }, []);

  const copyIp = useCallback(() => {
    const showToast = () => {
      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(SERVER_IP)
        .then(showToast)
        .catch(() => fallbackCopy(SERVER_IP, showToast));
    } else {
      fallbackCopy(SERVER_IP, showToast);
    }
  }, []);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <SiteContext.Provider
      value={{
        locale,
        setLocale,
        t: content[locale],
        copyIp,
        toastVisible,
        mobileOpen,
        toggleMobile,
        closeMobile,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within a SiteProvider");
  return ctx;
}
