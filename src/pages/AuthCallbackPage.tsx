import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { useAuth } from "../context/AuthProvider";
import { useSite } from "../context/SiteProvider";
import { loginUrl } from "../lib/api";

/** Bot przekierowuje tu po logowaniu Discord: /auth/callback#token=... (token w hashu nie trafia do logow serwera). */
export default function AuthCallbackPage() {
  const { ui } = useSite();
  const { acceptToken } = useAuth();
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const token = params.get("token");
    window.history.replaceState(null, "", window.location.pathname);
    if (token && token.length < 4096) {
      acceptToken(token);
      navigate("/konto", { replace: true });
    } else {
      setFailed(true);
    }
  }, [acceptToken, navigate]);

  return (
    <Page title={ui.account.title} description={ui.account.seoDesc} path="/auth/callback" noindex>
      <h2>{failed ? ui.account.authError : ui.account.loggingIn}</h2>
      {failed && (
        <p>
          <a className="btn btn-primary" href={loginUrl()}>{ui.account.loginBtn}</a> <Link to="/">{ui.common.back}</Link>
        </p>
      )}
    </Page>
  );
}
