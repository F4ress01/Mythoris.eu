import { Link, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import WikiEditor from "../components/WikiEditor";
import { useAuth } from "../context/AuthProvider";
import { useSite } from "../context/SiteProvider";
import { loginUrl } from "../lib/api";

export default function WikiNewPage() {
  const { ui } = useSite();
  const { canEdit, me, loading, enabled } = useAuth();
  const navigate = useNavigate();
  return (
    <Page title={ui.wiki.newPage} description={ui.wiki.seoDesc} path="/wiki-new" noindex>
      <p className="kicker">
        <Link to="/wiki">{ui.wiki.kicker}</Link>
      </p>
      <h2>{ui.wiki.newPage}</h2>
      {loading ? (
        <p className="lede">{ui.common.loading}</p>
      ) : canEdit ? (
        <WikiEditor initial={null} onCancel={() => navigate("/wiki")} onSaved={(slug) => navigate(`/wiki/${slug}`)} />
      ) : (
        <>
          <p className="lede">{me ? ui.common.forbidden : ui.account.loginPrompt}</p>
          {!me && enabled && (
            <a className="btn btn-primary" href={loginUrl()}>
              {ui.account.loginBtn}
            </a>
          )}
        </>
      )}
    </Page>
  );
}
