import { useEffect } from "react";

const SITE = "https://mythoris.eu";
const DEFAULT_IMAGE = `${SITE}/assets/mythoris-logo.png`;

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/** Tytul, opis, Open Graph, Twitter Card i canonical dla biezacej podstrony (SPA - ustawiane po stronie klienta). */
export function useSeo(opts: { title: string; description: string; path: string; noindex?: boolean }) {
  const { title, description, path, noindex } = opts;
  useEffect(() => {
    const full = title.includes("Mythoris") ? title : `${title} | Mythoris`;
    const url = `${SITE}${path}`;
    document.title = full;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Mythoris");
    setMeta("property", "og:image", DEFAULT_IMAGE);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", full);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", DEFAULT_IMAGE);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path, noindex]);
}
