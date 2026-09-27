import BackToTop from "../components/BackToTop";
import Community from "../components/Community";
import DiscordHighlight from "../components/DiscordHighlight";
import Footer from "../components/Footer";
import Gameplay from "../components/Gameplay";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import ScrollToHash from "../components/ScrollToHash";
import Toast from "../components/Toast";

export default function HomePage() {
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
