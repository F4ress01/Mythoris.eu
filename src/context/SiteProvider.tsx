import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { content, SERVER_IP, type Locale, type SiteContent } from "../content";
import { LOCALE_CODES } from "../i18n/locales";
import { ui as uiStrings, type Ui } from "../i18n/ui";

interface SiteContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: SiteContent;
  ui: Ui;
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
    if (saved && (LOCALE_CODES as string[]).includes(saved)) return saved as Locale;
  } catch {
    // localStorage unavailable — fall through to browser language
  }
  const nav = (navigator.language || "en").toLowerCase().slice(0, 2);
  return (LOCALE_CODES as string[]).includes(nav) ? (nav as Locale) : "en";
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
        ui: uiStrings[locale],
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
