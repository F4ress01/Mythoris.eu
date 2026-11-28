import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiState from "../components/ApiState";
import Markdown from "../components/Markdown";
import Page from "../components/Page";
import WikiEditor, { type WikiDoc } from "../components/WikiEditor";
import { useAuth } from "../context/AuthProvider";
import { useSite } from "../context/SiteProvider";
import { API_BASE } from "../lib/api";
import { pick, SLUG_RE, type LText } from "../lib/localized";
import { useApi } from "../lib/useApi";

interface Article extends WikiDoc {
  updated?: string;
  updatedBy?: string;
}

export default function WikiArticlePage() {
  const { slug = "" } = useParams();
  const { ui, locale } = useSite();
  const { canEdit } = useAuth();
  const w = ui.wiki;
  const [editing, setEditing] = useState(false);
  const valid = SLUG_RE.test(slug);
  const { data, state, reload } = useApi<Article>(API_BASE && valid ? `/api/wiki/${slug}` : null);

  const title = data ? pick(data.title as LText, locale) : { text: slug, fallback: false };
  const body = data ? pick(data.body as LText, locale) : { text: "", fallback: false };

  return (
    <Page title={title.text || slug} description={body.text.replace(/[#*_`>\[\]]/g, "").slice(0, 160) || w.seoDesc} path={`/wiki/${slug}`}>
      <p className="kicker">
        <Link to="/wiki">{w.kicker}</Link>
        {data?.category ? ` / ${data.category}` : ""}
      </p>
      {!valid ? (
        <ApiState state="notfound" />
      ) : state !== "ok" || !data ? (
        <ApiState state={state} onRetry={reload} />
      ) : editing ? (
        <WikiEditor initial={data} onCancel={() => setEditing(false)} onSaved={() => { setEditing(false); reload(); }} />
      ) : (
        <article>
          <h2>{title.text || slug}</h2>
          {(title.fallback || body.fallback) && <p className="notice">{w.noTranslation}</p>}
          <Markdown source={body.text} />
          <p className="meta-line">
            {data.updated ? `${w.updated}: ${new Date(data.updated).toLocaleDateString(locale)}` : ""}
            {data.updatedBy ? ` ${w.by} ${data.updatedBy}` : ""}
          </p>
          {slug.startsWith("auto-") && <p className="notice">{ui.stats.wikiAutoNote}</p>}
          {canEdit && !slug.startsWith("auto-") && (
            <button type="button" className="btn btn-ghost" onClick={() => setEditing(true)}>
              ✎ {ui.common.edit}
            </button>
          )}
        </article>
      )}
    </Page>
  );
}
