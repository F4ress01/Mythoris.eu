import { useSite } from "../context/SiteProvider";

/** Link "przejdz do tresci" widoczny po fokusie klawiatura (WCAG 2.4.1). */
export default function SkipLink() {
  const { ui } = useSite();
  return (
    <a
      className="skip-link"
      href="#main"
      onClick={(e) => {
        e.preventDefault();
        const main = document.querySelector("main");
        if (main) {
          main.setAttribute("tabindex", "-1");
          (main as HTMLElement).focus();
        }
      }}
    >
      {ui.common.skip}
    </a>
  );
}
