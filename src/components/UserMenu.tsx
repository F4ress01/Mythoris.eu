import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useSite } from "../context/SiteProvider";
import { loginUrl } from "../lib/api";

export default function UserMenu({ onNavigate }: { onNavigate?: () => void }) {
  const { ui } = useSite();
  const { me, enabled, loading } = useAuth();
  if (!enabled) return null;
  if (me)
    return (
      <Link className="user-chip" to="/konto" onClick={onNavigate}>
        {me.avatar ? <img src={me.avatar} alt="" width={22} height={22} loading="lazy" /> : null}
        <span>{me.name}</span>
      </Link>
    );
  if (loading) return null;
  return (
    <a className="user-chip" href={loginUrl()}>
      {ui.nav.login}
    </a>
  );
}
