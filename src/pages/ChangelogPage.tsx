import { useState } from "react";
import ApiState from "../components/ApiState";
import LangTabs from "../components/LangTabs";
import Page from "../components/Page";
import { useAuth } from "../context/AuthProvider";
import { useSite } from "../context/SiteProvider";
import { LOCALE_CODES, type LocaleCode } from "../i18n/locales";
import { api, API_BASE, ApiError } from "../lib/api";
import { pick, pickList, type LText } from "../lib/localized";
import { useApi } from "../lib/useApi";

interface Entry {
  id: string;
  version: string;
  date: string;
  title: LText;
  items: Partial<Record<string, string[]>>;
}

function Editor({ initial, onDone }: { initial: Entry | null; onDone: (changed: boolean) => void }) {
  const { ui, locale } = useSite();
  const c = ui.changelog;
  const [version, setVersion] = useState(initial?.version ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [title, setTitle] = useState<LText>(initial?.title ?? {});
  const [items, setItems] = useState<LText>(
    Object.fromEntries(LOCALE_CODES.map((l) => [l, (initial?.items?.[l] ?? []).join("\n")]))
  );
  const [lang, setLang] = useState<LocaleCode>(locale);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async () => {
    const t = Object.fromEntries(LOCALE_CODES.map((l) => [l, (title[l] ?? "").trim()] as const).filter(([, v]) => v));
    const it = Object.fromEntries(
      LOCALE_CODES.map((l) => [l, (items[l] ?? "").split("\n").map((x) => x.trim()).filter(Boolean)] as const).filter(([, v]) => v.length)
    );
    if (Object.keys(t).length === 0 && Object.keys(it).length === 0) return setMsg(c.needItems);
    setBusy(true);
    setMsg(null);
    try {
      const body = { version: version.trim(), date, title: t, items: it };
      if (initial) await api(`/api/changelog/${initial.id}`, { method: "PUT", body });
      else await api("/api/changelog", { method: "POST", body });
      onDone(true);
    } catch (e) {
      setMsg(e instanceof ApiError && e.status === 429 ? ui.common.rateLimited : ui.common.error);
      setBusy(false);
    }
  };

  return (
    <form className="editor" onSubmit={(e) => { e.preventDefault(); void submit(); }}>
      <div className="two-col">
        <label>
          {c.version}
          <input className="field" value={version} onChange={(e) => setVersion(e.target.value)} maxLength={30} placeholder="1.4.0" />
        </label>
        <label>
          {c.date}
          <input className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
      </div>
      <LangTabs value={lang} onChange={setLang} filled={(l) => Boolean(title[l]?.trim() || items[l]?.trim())} />
      <label>
        {c.titleLabel} ({lang.toUpperCase()})
        <input className="field" value={title[lang] ?? ""} onChange={(e) => setTitle({ ...title, [lang]: e.target.value })} maxLength={120} />
      </label>
      <label>
        {c.items} ({lang.toUpperCase()})
        <textarea className="field" rows={8} value={items[lang] ?? ""} onChange={(e) => setItems({ ...items, [lang]: e.target.value })} maxLength={8000} />
      </label>
      {msg && <p className="form-msg" role="alert">{msg}</p>}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? ui.common.saving : ui.common.save}</button>
        <button type="button" className="btn btn-ghost" onClick={() => onDone(false)} disabled={busy}>{ui.common.cancel}</button>
      </div>
    </form>
  );
}

export default function ChangelogPage() {
  const { ui, locale } = useSite();
  const { isAdmin } = useAuth();
  const c = ui.changelog;
  const { data, state, reload } = useApi<{ entries: Entry[] }>(API_BASE ? "/api/changelog" : null);
  const [editing, setEditing] = useState<Entry | "new" | null>(null);

  const done = (changed: boolean) => {
    setEditing(null);
    if (changed) reload();
  };

  const remove = async (id: string) => {
    if (!window.confirm(ui.common.confirmDelete)) return;
    try {
      await api(`/api/changelog/${id}`, { method: "DELETE" });
      reload();
    } catch {
      window.alert(ui.common.error);
    }
  };

  return (
    <Page title={c.title} description={c.seoDesc} path="/changelog">
      <p className="kicker">{c.kicker}</p>
      <h2>{c.title}</h2>
      <p className="lede">{c.intro}</p>
      {isAdmin && editing === null && (
        <p>
          <button type="button" className="btn btn-primary" onClick={() => setEditing("new")}>
            + {c.newEntry}
          </button>
        </p>
      )}
      {editing !== null && <Editor initial={editing === "new" ? null : editing} onDone={done} />}
      {state === "ok" && data ? (
        data.entries.length === 0 ? (
          <p className="lede">{c.empty}</p>
        ) : (
          <ol className="changelog">
            {data.entries.map((e) => {
              const items = pickList(e.items, locale);
              return (
                <li key={e.id}>
                  <header>
                    {e.version && <span className="version">{e.version}</span>}
                    <time dateTime={e.date}>{new Date(e.date).toLocaleDateString(locale)}</time>
                  </header>
                  {pick(e.title, locale).text && <h3>{pick(e.title, locale).text}</h3>}
                  {items.length > 0 && (
                    <ul>
                      {items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  )}
                  {isAdmin && (
                    <div className="form-actions">
                      <button type="button" className="btn btn-ghost" onClick={() => setEditing(e)}>{ui.common.edit}</button>
                      <button type="button" className="btn btn-danger" onClick={() => void remove(e.id)}>{ui.common.delete}</button>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        )
      ) : (
        <ApiState state={state} onRetry={reload} />
      )}
    </Page>
  );
}
