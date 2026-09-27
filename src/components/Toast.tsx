import { useSite } from "../context/SiteProvider";

export default function Toast() {
  const { t, toastVisible } = useSite();

  return (
    <div className={`copied-toast${toastVisible ? " show" : ""}`} role="status" aria-live="polite">
      {t.toast}
    </div>
  );
}
