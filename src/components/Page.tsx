import type { ReactNode } from "react";
import { useSeo } from "../lib/useSeo";
import Footer from "./Footer";
import Nav from "./Nav";
import Toast from "./Toast";

/** Wspolny szkielet podstrony: nawigacja, tresc (main), stopka, SEO. */
export default function Page(props: { title: string; description: string; path: string; noindex?: boolean; wide?: boolean; children: ReactNode }) {
  useSeo({ title: props.title, description: props.description, path: props.path, noindex: props.noindex });
  return (
    <>
      <Nav />
      <main>
        <section style={{ paddingTop: 64 }}>
          <div className="wrap" style={{ maxWidth: props.wide ? 1000 : 820 }}>
            {props.children}
          </div>
        </section>
      </main>
      <Footer />
      <Toast />
    </>
  );
}
