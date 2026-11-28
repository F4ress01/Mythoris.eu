import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SkipLink from "./components/SkipLink";
import { AuthProvider } from "./context/AuthProvider";
import { SiteProvider } from "./context/SiteProvider";
import HomePage from "./pages/HomePage";

// Podstrony ladowane leniwie (osobne chunki) - strona glowna zostaje w glownym bundlu.
const DiscordRedirectPage = lazy(() => import("./pages/DiscordRedirectPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const RulesPage = lazy(() => import("./pages/RulesPage"));
const PacksPage = lazy(() => import("./pages/PacksPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const RankingPage = lazy(() => import("./pages/RankingPage"));
const MarketPage = lazy(() => import("./pages/MarketPage"));
const WikiPage = lazy(() => import("./pages/WikiPage"));
const WikiArticlePage = lazy(() => import("./pages/WikiArticlePage"));
const WikiNewPage = lazy(() => import("./pages/WikiNewPage"));
const ChangelogPage = lazy(() => import("./pages/ChangelogPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const AuthCallbackPage = lazy(() => import("./pages/AuthCallbackPage"));

export default function App() {
  return (
    <SiteProvider>
      <AuthProvider>
        <BrowserRouter>
          <SkipLink />
          <Suspense fallback={<div className="page-loading" role="status" aria-live="polite">…</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/discord" element={<DiscordRedirectPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/packs" element={<PacksPage />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/wiki" element={<WikiPage />} />
              <Route path="/wiki-new" element={<WikiNewPage />} />
              <Route path="/wiki/:slug" element={<WikiArticlePage />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/konto" element={<AccountPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              <Route path="/profil/:nick" element={<ProfilePage />} />
              <Route path="/profile/:nick" element={<ProfilePage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </SiteProvider>
  );
}
