import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import ApiState from "../components/ApiState";
import Page from "../components/Page";
import { useAuth } from "../context/AuthProvider";
import { useSite } from "../context/SiteProvider";
import { api, API_BASE, ApiError, loginUrl } from "../lib/api";
import { useApi } from "../lib/useApi";

interface Editor {
  id: string;
  name: string;
  addedAt?: string;
}

function AccessManager() {
  const { ui, locale } = useSite();
  const a = ui.account;
  const { data, state, reload } = useApi<{ editors: Editor[] }>("/api/access");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const grant = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\d{15,25}$/.test(id.trim())) return setMsg(a.discordId);
    try {
      await api(`/api/access/${id.trim()}`, { method: "PUT", body: { name: name.trim() } });
      setId("");
      setName("");
      setMsg(null);
      reload();
    } catch (err) {
      setMsg(err instanceof ApiError && err.status === 429 ? ui.common.rateLimited : ui.common.error);
    }
  };

  const revoke = async (target: string) => {
    try {
      await api(`/api/access/${target}`, { method: "DELETE" });
      reload();
    } catch {
      setMsg(ui.common.error);
    }
  };

  return (
    <section className="account-block">
      <h3>{a.access}</h3>
      <p className="lede">{a.accessIntro}</p>
      <form className="inline-form" onSubmit={(e) => void grant(e)}>
        <label className="sr-only" htmlFor="acc-id">{a.discordId}</label>
        <input id="acc-id" className="field" value={id} onChange={(e) => setId(e.target.value)} placeholder={a.discordId} inputMode="numeric" required />
        <label className="sr-only" htmlFor="acc-name">{a.displayName}</label>
        <input id="acc-name" className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder={a.displayName} maxLength={40} />
        <button type="submit" className="btn btn-primary">{a.grant}</button>
      </form>
      {msg && <p className="form-msg" role="alert">{msg}</p>}
      {state === "ok" && data ? (
        data.editors.length === 0 ? (
          <p className="lede">{a.noEditors}</p>
        ) : (
          <ul className="editor-list">
            {data.editors.map((ed) => (
              <li key={ed.id}>
                <span>
                  <strong>{ed.name || ed.id}</strong> <small>({ed.id}){ed.addedAt ? ` · ${a.added} ${new Date(ed.addedAt).toLocaleDateString(locale)}` : ""}</small>
                </span>
                <button type="button" className="btn btn-danger" onClick={() => void revoke(ed.id)}>{a.revoke}</button>
              </li>
            ))}
          </ul>
        )
      ) : (
        <ApiState state={state} onRetry={reload} />
      )}
    </section>
  );
}

export default function AccountPage() {
  const { ui } = useSite();
  const { me, loading, enabled, logout, canEdit, isAdmin } = useAuth();
  const a = ui.account;
  const roleName = me?.role === "admin" ? a.roleAdmin : me?.role === "editor" ? a.roleEditor : a.roleUser;
  const mc = me?.minecraft;

  return (
    <Page title={a.title} description={a.seoDesc} path="/konto" noindex>
      <p className="kicker">{a.kicker}</p>
      <h2>{a.title}</h2>
      {!enabled || !API_BASE ? (
        <ApiState state="unconfigured" />
      ) : loading ? (
        <ApiState state="loading" />
      ) : !me ? (
        <>
          <p className="lede">{a.loginPrompt}</p>
          <a className="btn btn-primary" href={loginUrl()}>{a.loginBtn}</a>
        </>
      ) : (
        <>
          <div className="profile-head">
            {me.avatar ? <img src={me.avatar} alt="" width={72} height={72} /> : null}
            <div>
              <h3>{me.name}</h3>
              <p className="lede">{roleName}</p>
            </div>
          </div>
          <section className="account-block">
            <h3>{a.minecraft}</h3>
            {mc ? (
              <p>
                <Link to={`/profil/${encodeURIComponent(mc.name)}`}>{mc.name}</Link> — {ui.profile.level} {mc.level ?? "—"}, {mc.class ?? "—"}
              </p>
            ) : (
              <p className="lede">{a.notLinked}</p>
            )}
          </section>
          {(canEdit || isAdmin) && (
            <section className="account-block">
              <h3>{a.manage}</h3>
              <p>
                {canEdit && <Link className="btn btn-ghost" to="/wiki-new">+ {ui.wiki.newPage}</Link>}{" "}
                {isAdmin && <Link className="btn btn-ghost" to="/changelog">{ui.changelog.newEntry}</Link>}
              </p>
            </section>
          )}
          {isAdmin && <AccessManager />}
          <p style={{ marginTop: 32 }}>
            <button type="button" className="btn btn-ghost" onClick={logout}>{ui.nav.logout}</button>
          </p>
        </>
      )}
    </Page>
  );
}
