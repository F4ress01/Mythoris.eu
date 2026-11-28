import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiState from "../components/ApiState";
import Page from "../components/Page";
import { useSite } from "../context/SiteProvider";
import { API_BASE } from "../lib/api";
import { pick, type LText } from "../lib/localized";
import { useApi } from "../lib/useApi";

interface Listing {
  id: number | string;
  seller: string;
  item: { name: string; material: string; rarity: string | null; category: string | null; amount: number; lore: string[] };
  price: number;
  expires: string | null;
}
interface MarketResponse {
  total: number;
  page: number;
  pages: number;
  sort: string;
  categories: { id: string; name: LText }[];
  items: Listing[];
}

const SORTS = ["newest", "cheapest", "expensive", "ending"] as const;
type Sort = (typeof SORTS)[number];
const RARITIES = ["common", "uncommon", "rare", "epic", "legendary", "mythic", "godly", "superior"] as const;

export default function MarketPage() {
  const { ui, locale } = useSite();
  const m = ui.market;
  const [input, setInput] = useState("");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [rarity, setRarity] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [page, setPage] = useState(1);

  // wyszukiwanie z opoznieniem, zeby nie wysylac zapytania przy kazdym znaku
  useEffect(() => {
    const t = window.setTimeout(() => { setQ(input.trim()); setPage(1); }, 350);
    return () => window.clearTimeout(t);
  }, [input]);

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (rarity) params.set("rarity", rarity);
  params.set("sort", sort);
  if (page > 1) params.set("page", String(page));
  const { data, state, reload } = useApi<MarketResponse>(API_BASE ? `/api/market?${params}` : null);

  const sortLabel: Record<Sort, string> = { newest: m.sortNewest, cheapest: m.sortCheapest, expensive: m.sortExpensive, ending: m.sortEnding };
  const rarityLabel = (r: string | null) => (r && (m.rarities as Record<string, string>)[r]) || r || "—";
  const money = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });

  const expiry = (iso: string | null) => {
    if (!iso) return "—";
    const ms = new Date(iso).getTime() - Date.now();
    if (!Number.isFinite(ms) || ms <= 0) return "—";
    const h = ms / 3_600_000;
    if (h < 1) return m.inLessThanHour;
    if (h < 48) return m.hoursLeft.replace("{n}", String(Math.floor(h)));
    return m.daysLeft.replace("{n}", String(Math.floor(h / 24)));
  };

  return (
    <Page title={m.title} description={m.seoDesc} path="/market" wide>
      <p className="kicker">{m.kicker}</p>
      <h2>{m.title}</h2>
      <p className="lede">{m.intro}</p>
      <div className="toolbar market-toolbar">
        <label className="sr-only" htmlFor="market-search">{m.search}</label>
        <input id="market-search" className="field" type="search" value={input} maxLength={40} onChange={(e) => setInput(e.target.value)} placeholder={m.search} />
        <label className="sr-only" htmlFor="market-category">{m.category}</label>
        <select id="market-category" className="field" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
          <option value="">{m.category}: {m.allCategories}</option>
          {(data?.categories ?? []).map((c) => (
            <option key={c.id} value={c.id}>{pick(c.name, locale).text || c.id}</option>
          ))}
        </select>
        <label className="sr-only" htmlFor="market-rarity">{m.rarity}</label>
        <select id="market-rarity" className="field" value={rarity} onChange={(e) => { setRarity(e.target.value); setPage(1); }}>
          <option value="">{m.rarity}: {m.allRarities}</option>
          {RARITIES.map((r) => (
            <option key={r} value={r}>{m.rarities[r]}</option>
          ))}
        </select>
        <label className="sr-only" htmlFor="market-sort">{m.sortLabel}</label>
        <select id="market-sort" className="field" value={sort} onChange={(e) => { setSort(e.target.value as Sort); setPage(1); }}>
          {SORTS.map((s) => (
            <option key={s} value={s}>{m.sortLabel}: {sortLabel[s]}</option>
          ))}
        </select>
      </div>

      {state === "ok" && data ? (
        data.items.length === 0 ? (
          <p className="lede">{m.empty}</p>
        ) : (
          <>
            <p className="meta-line" role="status">{m.results.replace("{n}", String(data.total))}</p>
            <div className="table-wrap">
              <table className="rank-table market-table">
                <thead>
                  <tr>
                    <th scope="col">{m.kicker}</th>
                    <th scope="col">{m.rarity}</th>
                    <th scope="col">{m.amount}</th>
                    <th scope="col">{m.price}</th>
                    <th scope="col">{m.seller}</th>
                    <th scope="col">{m.expires}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((l) => (
                    <tr key={l.id}>
                      <td>
                        <strong>{l.item.name || l.item.material}</strong>
                        {l.item.lore.length > 0 && <small className="market-lore">{l.item.lore.slice(0, 2).join(" · ")}</small>}
                      </td>
                      <td><span className={`rarity rarity-${l.item.rarity ?? "none"}`}>{rarityLabel(l.item.rarity)}</span></td>
                      <td>{l.item.amount}</td>
                      <td>{money.format(l.price)}</td>
                      <td>
                        <Link to={`/profil/${encodeURIComponent(l.seller)}`} className="rank-player">
                          <img src={`https://mc-heads.net/avatar/${encodeURIComponent(l.seller)}/24`} alt="" width={24} height={24} loading="lazy" />
                          {l.seller}
                        </Link>
                      </td>
                      <td>{expiry(l.expires)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.pages > 1 && (
              <nav className="pager" aria-label={m.page.replace("{p}", String(data.page)).replace("{n}", String(data.pages))}>
                <button type="button" className="btn btn-ghost" disabled={data.page <= 1} onClick={() => setPage(data.page - 1)}>← {m.prev}</button>
                <span>{m.page.replace("{p}", String(data.page)).replace("{n}", String(data.pages))}</span>
                <button type="button" className="btn btn-ghost" disabled={data.page >= data.pages} onClick={() => setPage(data.page + 1)}>{m.next} →</button>
              </nav>
            )}
          </>
        )
      ) : (
        <ApiState state={state} onRetry={reload} />
      )}
      <p className="meta-line">{m.buyHint}</p>
    </Page>
  );
}
