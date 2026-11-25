import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSite } from "../context/SiteProvider";

export default function ProfileSearch({ onDone }: { onDone?: () => void }) {
  const { ui } = useSite();
  const [nick, setNick] = useState("");
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = nick.trim();
    if (!/^[A-Za-z0-9_]{1,16}$/.test(n)) return;
    navigate(`/profil/${encodeURIComponent(n)}`);
    setNick("");
    onDone?.();
  };

  return (
    <form className="profile-search" role="search" onSubmit={submit}>
      <label className="sr-only" htmlFor="profile-search-input">{ui.nav.searchLabel}</label>
      <input
        id="profile-search-input"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
        placeholder={ui.nav.searchPlaceholder}
        maxLength={16}
        pattern="[A-Za-z0-9_]{1,16}"
        autoComplete="off"
        spellCheck={false}
      />
      <button type="submit" aria-label={ui.nav.searchBtn}>🔍</button>
    </form>
  );
}
