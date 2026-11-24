import BackToTop from "../components/BackToTop";
import Community from "../components/Community";
import DiscordHighlight from "../components/DiscordHighlight";
import Footer from "../components/Footer";
import Gameplay from "../components/Gameplay";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import ScrollToHash from "../components/ScrollToHash";
import Toast from "../components/Toast";
import { useSite } from "../context/SiteProvider";
import { useSeo } from "../lib/useSeo";

export default function HomePage() {
  const { t } = useSite();
  useSeo({ title: "Mythoris — Minecraft MMORPG", description: t.hero.tagline.slice(0, 200), path: "/" });
  return (
    <>
      <ScrollToHash />
      <Nav />
      <main id="top">
        <Hero />
        <Gameplay />
        <DiscordHighlight />
        <Community />
      </main>
      <Footer />
      <Toast />
      <BackToTop />
    </>
  );
}
