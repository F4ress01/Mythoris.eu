import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ApiState from "../components/ApiState";
import Page from "../components/Page";
import { useAuth } from "../context/AuthProvider";
import { useSite } from "../context/SiteProvider";
import { API_BASE } from "../lib/api";
import { pick, type LText } from "../lib/localized";
import { useApi } from "../lib/useApi";

interface WikiItem {
  slug: string;
  category: string;
  title: LText;
  updated?: string;
}

export default function WikiPage() {
  const { ui, locale } = useSite();
  const { canEdit } = useAuth();
  const w = ui.wiki;
  const { data, state, reload } = useApi<{ pages: WikiItem[] }>(API_BASE ? "/api/wiki" : null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const pages = data?.pages ?? [];
  const categories = useMemo(() => Array.from(new Set(pages.map((p) => p.category || ""))).sort(), [pages]);
  const q = query.trim().toLowerCase();
  const shown = pages
    .filter((p) => cat === null || (p.category || "") === cat)
    .filter((p) => !q || p.slug.includes(q) || Object.values(p.title).some((t) => t?.toLowerCase().includes(q)))
    .sort((a, b) => pick(a.title, locale).text.localeCompare(pick(b.title, locale).text, locale));

  return (
    <Page title={w.title} description={w.seoDesc} path="/wiki">
      <p className="kicker">{w.kicker}</p>
      <h2>{w.title}</h2>
      <p className="lede">{w.intro}</p>
      <div className="toolbar">
        <label className="sr-only" htmlFor="wiki-search">{w.searchPlaceholder}</label>
        <input id="wiki-search" className="field" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={w.searchPlaceholder} />
        {canEdit && (
          <Link to="/wiki-new" className="btn btn-primary">
            + {w.newPage}
          </Link>
        )}
      </div>
      {state === "ok" ? (
        pages.length === 0 ? (
          <p className="lede">{w.empty}</p>
        ) : (
          <>
            <div className="chips" role="group" aria-label={w.category}>
              <button type="button" className={cat === null ? "active" : ""} aria-pressed={cat === null} onClick={() => setCat(null)}>
                {w.all}
              </button>
              {categories.map((c) => (
                <button key={c} type="button" className={cat === c ? "active" : ""} aria-pressed={cat === c} onClick={() => setCat(c)}>
                  {c || w.uncategorized}
                </button>
              ))}
            </div>
            {shown.length === 0 ? (
              <p className="lede">{w.noResults}</p>
            ) : (
              <ul className="wiki-list">
                {shown.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/wiki/${p.slug}`}>
                      <strong>{pick(p.title, locale).text || p.slug}</strong>
                      <span>{p.category || w.uncategorized}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )
      ) : (
        <ApiState state={state} onRetry={reload} />
      )}
    </Page>
  );
}
