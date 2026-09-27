import type { MouseEvent } from "react";
import type { NavigateFunction } from "react-router-dom";

/**
 * Section links (#rozgrywka, #discord, #spolecznosc, #top) only exist on the
 * home page. When clicked from another page (e.g. /rules, /shop), a plain
 * anchor does nothing because the target id isn't on the current page.
 *
 * If we're already on "/", let the native anchor behavior run as-is (smooth
 * scroll via CSS, no JS needed). Otherwise, navigate to "/" with the hash —
 * HomePage's <ScrollToHash /> picks it up after mounting and scrolls there.
 */
export function goToSection(
  e: MouseEvent<HTMLAnchorElement>,
  id: string,
  pathname: string,
  navigate: NavigateFunction
) {
  if (pathname === "/") return;
  e.preventDefault();
  navigate(`/#${id}`);
}
