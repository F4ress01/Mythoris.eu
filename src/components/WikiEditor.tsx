import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useSite } from "../context/SiteProvider";
import { LOCALE_CODES, type LocaleCode } from "../i18n/locales";
import { api, ApiError } from "../lib/api";
import { SLUG_RE, type LText } from "../lib/localized";
import LangTabs from "./LangTabs";
import Markdown from "./Markdown";

export interface WikiDoc {
  slug: string;
  category: string;
  title: LText;
  body: LText;
}

export default function WikiEditor({ initial, onCancel, onSaved }: { initial: WikiDoc | null; onCancel: () => void; onSaved: (slug: string) => void }) {
  const { ui, locale } = useSite();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const w = ui.wiki;
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [title, setTitle] = useState<LText>(initial?.title ?? {});
  const [body, setBody] = useState<LText>(initial?.body ?? {});
  const [lang, setLang] = useState<LocaleCode>(locale);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const clean = (m: LText): LText => Object.fromEntries(LOCALE_CODES.map((c) => [c, (m[c] ?? "").trim()] as const).filter(([, v]) => v));

  const errorText = (e: unknown) => {
    const s = e instanceof ApiError ? e.status : 0;
    return s === 429 ? ui.common.rateLimited : s === 401 || s === 403 ? ui.common.forbidden : ui.common.error;
  };

  const save = async () => {
    const t = clean(title);
    if (!SLUG_RE.test(slug)) return setMsg(w.slugInvalid);
    if (Object.keys(t).length === 0) return setMsg(w.needTitle);
    setBusy(true);
    setMsg(null);
    try {
      await api(`/api/wiki/${slug}`, { method: "PUT", body: { category: category.trim(), title: t, body: clean(body) } });
      onSaved(slug);
    } catch (e) {
      setMsg(errorText(e));
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!initial || !window.confirm(ui.common.confirmDelete)) return;
    setBusy(true);
    try {
      await api(`/api/wiki/${initial.slug}`, { method: "DELETE" });
      navigate("/wiki");
    } catch (e) {
      setMsg(errorText(e));
      setBusy(false);
    }
  };

  return (
    <form className="editor" onSubmit={(e) => { e.preventDefault(); void save(); }}>
      <label>
        {w.slug}
        <input className="field" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} disabled={Boolean(initial)} maxLength={60} required />
      </label>
      <label>
        {w.category}
        <input className="field" value={category} onChange={(e) => setCategory(e.target.value)} maxLength={40} />
      </label>
      <LangTabs value={lang} onChange={setLang} filled={(l) => Boolean(title[l]?.trim() || body[l]?.trim())} />
      <label>
        {w.titleLabel} ({lang.toUpperCase()})
        <input className="field" value={title[lang] ?? ""} onChange={(e) => setTitle({ ...title, [lang]: e.target.value })} maxLength={120} />
      </label>
      <div className="seg" role="group">
        <button type="button" className={!preview ? "active" : ""} aria-pressed={!preview} onClick={() => setPreview(false)}>{w.editTab}</button>
        <button type="button" className={preview ? "active" : ""} aria-pressed={preview} onClick={() => setPreview(true)}>{w.preview}</button>
      </div>
      {preview ? (
        <div className="editor-preview"><Markdown source={body[lang] ?? ""} /></div>
      ) : (
        <label>
          {w.bodyLabel} ({lang.toUpperCase()})
          <textarea className="field" rows={16} value={body[lang] ?? ""} onChange={(e) => setBody({ ...body, [lang]: e.target.value })} maxLength={50000} />
        </label>
      )}
      {msg && <p className="form-msg" role="alert">{msg}</p>}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? ui.common.saving : ui.common.save}</button>
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={busy}>{ui.common.cancel}</button>
        {initial && isAdmin && (
          <button type="button" className="btn btn-danger" onClick={() => void remove()} disabled={busy}>{ui.common.delete}</button>
        )}
      </div>
    </form>
  );
}
