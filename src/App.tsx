import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteProvider } from "./context/SiteProvider";
import HomePage from "./pages/HomePage";
import DiscordRedirectPage from "./pages/DiscordRedirectPage";
import ShopPage from "./pages/ShopPage";
import RulesPage from "./pages/RulesPage";

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/discord" element={<DiscordRedirectPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}
